import crypto from 'node:crypto';
import { getRazorpay } from '../../config/razorpay.js';
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { sendResponse } from '../../utils/send-response.js';
import { sendOrderConfirmation } from '../../utils/email.js';
import Buyer from '../../models/Buyer.js';

/**
 * Create a Razorpay order for a given Order document.
 */
export const createRazorpayOrder = catchAsync(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findOne({ _id: orderId, buyer: req.buyer.id });
  if (!order) throw new ApiError(404, 'Order not found.');
  if (order.payment.status === 'captured') {
    throw new ApiError(400, 'This order has already been paid.');
  }

  const razorpay = getRazorpay();
  const rpOrder = await razorpay.orders.create({
    amount: Math.round(order.total * 100), // paise
    currency: 'INR',
    receipt: order.orderNumber,
  });

  order.payment.razorpayOrderId = rpOrder.id;
  await order.save();

  sendResponse(res, {
    data: {
      razorpayOrderId: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      orderId: order._id,
      orderNumber: order.orderNumber,
      keyId: env.RAZORPAY_KEY_ID,
    },
    message: 'Razorpay order created.',
  });
});

/**
 * Verify Razorpay payment signature and finalize the order.
 */
export const verifyPayment = catchAsync(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  // Verify signature
  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    // Mark payment as failed
    await Order.findByIdAndUpdate(orderId, {
      'payment.status': 'failed',
      status: 'pending',
    });
    throw new ApiError(400, 'Payment verification failed. Invalid signature.');
  }

  // Update order
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      status: 'paid',
      'payment.razorpayPaymentId': razorpay_payment_id,
      'payment.razorpaySignature': razorpay_signature,
      'payment.status': 'captured',
    },
    { new: true },
  );

  if (!order) throw new ApiError(404, 'Order not found.');

  // Decrease stock and increase salesCount
  const bulkOps = order.items.map((item) => ({
    updateOne: {
      filter: { _id: item.product },
      update: {
        $inc: { stock: -item.quantity, salesCount: item.quantity },
      },
    },
  }));
  if (bulkOps.length > 0) await Product.bulkWrite(bulkOps);

  // Send order confirmation email (fire-and-forget)
  try {
    const buyer = await Buyer.findById(order.buyer);
    if (buyer?.email) {
      sendOrderConfirmation(order, buyer.email).catch(() => {});
    }
  } catch {
    // Non-critical
  }

  sendResponse(res, { data: order, message: 'Payment verified. Order confirmed.' });
});
