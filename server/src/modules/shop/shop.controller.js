import Product from '../../models/Product.js';
import Category from '../../models/Category.js';
import Order from '../../models/Order.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/* ───── PUBLIC (no auth) ───── */

export const getProducts = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { status: 'published' };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;
  if (req.query.inStock === 'true') filter.stock = { $gt: 0 };
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  // Sorting
  let sort;
  switch (req.query.sort) {
    case 'price_asc': sort = { price: 1 }; break;
    case 'price_desc': sort = { price: -1 }; break;
    case 'popular': sort = { salesCount: -1 }; break;
    case 'newest':
    default: sort = { createdAt: -1 }; break;
  }

  const [data, total] = await Promise.all([
    Product.find(filter).populate('category', 'name slug').sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Products fetched.' });
});

export const getProduct = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug, status: 'published' }).populate('category', 'name slug');
  if (!product) throw new ApiError(404, 'Product not found.');
  sendResponse(res, { data: product, message: 'Product fetched.' });
});

export const getCategories = catchAsync(async (_req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
  sendResponse(res, { data: categories, message: 'Categories fetched.' });
});

export const getFeatured = catchAsync(async (_req, res) => {
  const products = await Product.find({ status: 'published', isFeatured: true })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .limit(8);

  sendResponse(res, { data: products, message: 'Featured products fetched.' });
});

/* ───── BUYER AUTHENTICATED ───── */

export const createOrder = catchAsync(async (req, res) => {
  const { items, shippingAddress, donationExtra = 0, notes } = req.body;
  const buyerId = req.buyer.id;

  // Resolve products and validate stock
  const productIds = items.map((i) => i.product);
  const products = await Product.find({ _id: { $in: productIds }, status: 'published' });

  if (products.length !== items.length) {
    throw new ApiError(400, 'One or more products are unavailable.');
  }

  const productMap = Object.fromEntries(products.map((p) => [p._id.toString(), p]));
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = productMap[item.product];
    if (!product) throw new ApiError(400, `Product ${item.product} not found.`);
    if (!product.isDonationOnly && product.stock < item.quantity) {
      throw new ApiError(400, `"${product.title}" only has ${product.stock} units in stock.`);
    }

    const lineTotal = product.price * item.quantity;
    subtotal += lineTotal;

    orderItems.push({
      product: product._id,
      title: product.title,
      image: product.images?.[0] || '',
      price: product.price,
      quantity: item.quantity,
    });
  }

  const total = subtotal + donationExtra;

  const order = await Order.create({
    buyer: buyerId,
    items: orderItems,
    shippingAddress,
    subtotal,
    donationExtra,
    shippingCost: 0,
    total,
    notes,
  });

  sendResponse(res, { statusCode: 201, data: order, message: 'Order created.' });
});

export const getMyOrders = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { buyer: req.buyer.id };

  const [data, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Orders fetched.' });
});

export const getMyOrder = catchAsync(async (req, res) => {
  const { orderNumber } = req.params;
  const order = await Order.findOne({ orderNumber, buyer: req.buyer.id }).populate('items.product', 'slug images');
  if (!order) throw new ApiError(404, 'Order not found.');
  sendResponse(res, { data: order, message: 'Order fetched.' });
});
