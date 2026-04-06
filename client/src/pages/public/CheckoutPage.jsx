import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, AlertCircle, Lock, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext.jsx';
import { useBuyerAuth } from '@/features/buyer-auth/BuyerAuthContext.jsx';
import { shopService } from '@/features/api/services/shop.service.js';
import { paymentService } from '@/features/api/services/payment.service.js';

export function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, cartTotal, clearCart } = useCart();
  const { buyer } = useBuyerAuth();

  const donationExtra = location.state?.donationExtra || 0;
  const grandTotal = cartTotal + donationExtra;

  const [address, setAddress] = useState({
    name: buyer?.name || '',
    phone: buyer?.phone || '',
    line1: buyer?.address?.line1 || '',
    line2: buyer?.address?.line2 || '',
    city: buyer?.address?.city || '',
    state: buyer?.address?.state || '',
    pincode: buyer?.address?.pincode || '',
    country: 'India',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (items.length === 0) navigate('/cart', { replace: true });
  }, [items, navigate]);

  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleCheckout = async () => {
    // Validate address
    if (!address.name || !address.line1 || !address.city || !address.state || !address.pincode) {
      setError('Please fill in all required address fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // [TEMPORARY MOCK] Mock order creation and payment success for now
      setTimeout(() => {
        const mockOrder = {
          _id: 'mock-12345',
          orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
          items: items.map(i => ({
            product: {
              images: [i.image],
              slug: ''
            },
            quantity: i.quantity,
            price: i.price,
            title: i.title,
          })),
          total: grandTotal,
          donationExtra: donationExtra,
        };
        
        clearCart();
        navigate(`/order-confirmation/${mockOrder.orderNumber}`, {
          state: { order: mockOrder },
          replace: true,
        });
      }, 1000);

      /* PROPER IMPLEMENTATION (Commented out for now)
      // 1. Create order
      const orderPayload = {
        items: items.map((i) => ({ product: i.productId, quantity: i.quantity })),
        shippingAddress: address,
        donationExtra,
      };
      const orderRes = await shopService.createOrder(orderPayload);
      const order = orderRes.data.data;

      // 2. Create Razorpay order
      const rpRes = await paymentService.createRazorpayOrder({ orderId: order._id });
      const rpData = rpRes.data.data;

      // 3. Open Razorpay popup
      const options = {
        key: rpData.keyId,
        amount: rpData.amount,
        currency: rpData.currency,
        name: 'Bhawna Foundation',
        description: `Order ${rpData.orderNumber}`,
        order_id: rpData.razorpayOrderId,
        handler: async (response) => {
          try {
            await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });
            clearCart();
            navigate(`/order-confirmation/${order.orderNumber}`, {
              state: { order },
              replace: true,
            });
          } catch (err) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: address.name,
          email: buyer?.email || '',
          contact: address.phone,
        },
        theme: { color: '#0B5ED7' },
        modal: {
          ondismiss: () => {
            setError('Payment was cancelled. Your order is saved — you can retry from My Orders.');
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      */
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-text-dark mb-8">Checkout</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Address */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm space-y-5">
            <h2 className="font-display text-lg font-bold text-text-dark flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-blue" /> Shipping Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-dark">Full Name *</label>
                <input name="name" value={address.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-dark">Phone</label>
                <input name="phone" value={address.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-sm font-medium text-text-dark">Address Line 1 *</label>
                <input name="line1" value={address.line1} onChange={handleChange} required placeholder="House/Flat No., Building Name" className="w-full px-4 py-3 rounded-xl border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-sm font-medium text-text-dark">Address Line 2</label>
                <input name="line2" value={address.line2} onChange={handleChange} placeholder="Street, Area, Landmark" className="w-full px-4 py-3 rounded-xl border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-dark">City *</label>
                <input name="city" value={address.city} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-dark">State *</label>
                <input name="state" value={address.state} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-dark">Pincode *</label>
                <input name="pincode" value={address.pincode} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-border-light bg-bg-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-dark">Country</label>
                <input name="country" value={address.country} onChange={handleChange} disabled className="w-full px-4 py-3 rounded-xl border border-border-light bg-gray-100 text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm sticky top-24 space-y-4">
            <h2 className="font-display text-lg font-bold text-text-dark flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-blue" /> Order Summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  {item.image ? (
                    <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-dark line-clamp-1">{item.title}</p>
                    <p className="text-xs text-text-muted">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                  </div>
                  <span className="text-sm font-semibold text-text-dark">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border-light pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-secondary">Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Shipping</span><span className="text-success-green font-medium">Free</span></div>
              {donationExtra > 0 && (
                <div className="flex justify-between text-warm-orange"><span>Extra Donation ❤️</span><span>₹{donationExtra.toLocaleString()}</span></div>
              )}
            </div>

            <div className="border-t border-border-light pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary-blue to-blue-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Pay ₹{grandTotal.toLocaleString()}
                </>
              )}
            </button>

            <p className="text-center text-xs text-text-muted">
              🔒 256-bit SSL encrypted payment via Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
