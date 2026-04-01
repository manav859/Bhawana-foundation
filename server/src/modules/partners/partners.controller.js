import Partner from '../../models/Partner.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/** GET /partners (public - active only, ordered) */
export const getPartners = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);

  const filter = { isActive: true };
  const [data, total] = await Promise.all([
    Partner.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    Partner.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Partners fetched successfully.' });
});

/** GET /partners/admin/all (admin) */
export const getAllPartners = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};
  if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };

  const [data, total] = await Promise.all([
    Partner.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    Partner.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'All partners fetched successfully.' });
});

/** GET /partners/:id */
export const getPartner = catchAsync(async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) throw new ApiError(404, 'Partner not found.');
  sendResponse(res, { data: partner, message: 'Partner fetched successfully.' });
});

/** POST /partners (admin) */
export const createPartner = catchAsync(async (req, res) => {
  const partner = await Partner.create(req.body);
  sendResponse(res, { statusCode: 201, data: partner, message: 'Partner created successfully.' });
});

/** PATCH /partners/:id (admin) */
export const updatePartner = catchAsync(async (req, res) => {
  const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!partner) throw new ApiError(404, 'Partner not found.');
  sendResponse(res, { data: partner, message: 'Partner updated successfully.' });
});

/** DELETE /partners/:id (admin) */
export const deletePartner = catchAsync(async (req, res) => {
  const partner = await Partner.findByIdAndDelete(req.params.id);
  if (!partner) throw new ApiError(404, 'Partner not found.');
  sendResponse(res, { data: partner, message: 'Partner deleted successfully.' });
});
