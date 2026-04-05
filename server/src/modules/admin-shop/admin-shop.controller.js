import Product from '../../models/Product.js';
import Category from '../../models/Category.js';
import Order from '../../models/Order.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/* ═══════════ PRODUCTS ═══════════ */

export const listProducts = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };
  if (req.query.lowStock === 'true') {
    filter.$expr = { $lte: ['$stock', '$lowStockThreshold'] };
  }

  const sort = buildSort(req.query.sort);

  const [data, total] = await Promise.all([
    Product.find(filter).populate('category', 'name').sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Products fetched.' });
});

export const getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');
  if (!product) throw new ApiError(404, 'Product not found.');
  sendResponse(res, { data: product, message: 'Product fetched.' });
});

export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  sendResponse(res, { statusCode: 201, data: product, message: 'Product created.' });
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) throw new ApiError(404, 'Product not found.');
  sendResponse(res, { data: product, message: 'Product updated.' });
});

export const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found.');
  sendResponse(res, { data: product, message: 'Product deleted.' });
});

/* ═══════════ CATEGORIES ═══════════ */

export const listCategories = catchAsync(async (req, res) => {
  const categories = await Category.find().sort({ sortOrder: 1, name: 1 });
  sendResponse(res, { data: categories, message: 'Categories fetched.' });
});

export const createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);
  sendResponse(res, { statusCode: 201, data: category, message: 'Category created.' });
});

export const updateCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) throw new ApiError(404, 'Category not found.');
  sendResponse(res, { data: category, message: 'Category updated.' });
});

export const deleteCategory = catchAsync(async (req, res) => {
  // Check if any products use this category
  const productCount = await Product.countDocuments({ category: req.params.id });
  if (productCount > 0) {
    throw new ApiError(400, `Cannot delete: ${productCount} product(s) are assigned to this category.`);
  }
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found.');
  sendResponse(res, { data: category, message: 'Category deleted.' });
});

/* ═══════════ ORDERS ═══════════ */

export const listOrders = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.$or = [
      { orderNumber: { $regex: req.query.search, $options: 'i' } },
      { 'shippingAddress.name': { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    Order.find(filter).populate('buyer', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Orders fetched.' });
});

export const getOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('buyer', 'name email phone')
    .populate('items.product', 'slug images');
  if (!order) throw new ApiError(404, 'Order not found.');
  sendResponse(res, { data: order, message: 'Order fetched.' });
});

export const updateOrderStatus = catchAsync(async (req, res) => {
  const updates = {};
  if (req.body.status) updates.status = req.body.status;
  if (req.body.trackingInfo) updates.trackingInfo = req.body.trackingInfo;
  if (req.body.notes) updates.notes = req.body.notes;

  const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!order) throw new ApiError(404, 'Order not found.');
  sendResponse(res, { data: order, message: 'Order updated.' });
});

export const exportOrdersCsv = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const orders = await Order.find(filter)
    .populate('buyer', 'name email')
    .sort({ createdAt: -1 })
    .limit(5000);

  const headers = ['Order Number', 'Date', 'Customer', 'Email', 'Items', 'Subtotal', 'Donation', 'Total', 'Status', 'Payment Status'];
  const rows = orders.map((o) => [
    o.orderNumber,
    new Date(o.createdAt).toISOString().slice(0, 10),
    o.buyer?.name || 'N/A',
    o.buyer?.email || 'N/A',
    o.items.map((i) => `${i.title} x${i.quantity}`).join('; '),
    o.subtotal,
    o.donationExtra,
    o.total,
    o.status,
    o.payment?.status || 'N/A',
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="orders-${Date.now()}.csv"`);
  res.send(csv);
});

/* ═══════════ ANALYTICS ═══════════ */

export const getAnalytics = catchAsync(async (_req, res) => {
  const [
    totalProducts,
    publishedProducts,
    totalOrders,
    orderStats,
    topProducts,
    lowStockProducts,
    recentOrders,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ status: 'published' }),
    Order.countDocuments(),
    Order.aggregate([
      { $match: { 'payment.status': 'captured' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$subtotal' },
          totalDonations: { $sum: '$donationExtra' },
          avgOrderValue: { $avg: '$total' },
          paidOrders: { $sum: 1 },
        },
      },
    ]),
    Product.find({ status: 'published' }).sort({ salesCount: -1 }).limit(5).select('title salesCount price images'),
    Product.find({
      status: 'published',
      $expr: { $lte: ['$stock', '$lowStockThreshold'] },
    }).select('title stock lowStockThreshold images').limit(10),
    Order.find().populate('buyer', 'name email').sort({ createdAt: -1 }).limit(5),
  ]);

  const stats = orderStats[0] || { totalRevenue: 0, totalDonations: 0, avgOrderValue: 0, paidOrders: 0 };

  sendResponse(res, {
    data: {
      totalProducts,
      publishedProducts,
      totalOrders,
      totalRevenue: stats.totalRevenue,
      totalDonations: stats.totalDonations,
      avgOrderValue: Math.round(stats.avgOrderValue || 0),
      paidOrders: stats.paidOrders,
      topProducts,
      lowStockProducts,
      recentOrders,
    },
    message: 'Analytics fetched.',
  });
});
