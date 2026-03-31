import Program from '../../models/Program.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/**
 * GET /programs (public)
 */
export const getPrograms = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);

  const filter = { status: 'published' };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    Program.find(filter).sort(sort).skip(skip).limit(limit),
    Program.countDocuments(filter),
  ]);

  sendResponse(res, {
    data,
    meta: buildPaginationMeta(total, page, limit),
    message: 'Programs fetched successfully.',
  });
});

/**
 * GET /programs/admin/all (admin - includes drafts)
 */
export const getAllPrograms = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.title = { $regex: req.query.search, $options: 'i' };
  }

  const [data, total] = await Promise.all([
    Program.find(filter).sort(sort).skip(skip).limit(limit),
    Program.countDocuments(filter),
  ]);

  sendResponse(res, {
    data,
    meta: buildPaginationMeta(total, page, limit),
    message: 'All programs fetched successfully.',
  });
});

/**
 * GET /programs/:identifier (public)
 */
export const getProgram = catchAsync(async (req, res) => {
  const { identifier } = req.params;
  const query = identifier.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: identifier }
    : { slug: identifier };

  const program = await Program.findOne({ ...query, status: 'published' });
  if (!program) throw new ApiError(404, 'Program not found.');

  sendResponse(res, { data: program, message: 'Program fetched successfully.' });
});

/**
 * POST /programs (admin)
 */
export const createProgram = catchAsync(async (req, res) => {
  const program = await Program.create(req.body);
  sendResponse(res, { statusCode: 201, data: program, message: 'Program created successfully.' });
});

/**
 * PATCH /programs/:id (admin)
 */
export const updateProgram = catchAsync(async (req, res) => {
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!program) throw new ApiError(404, 'Program not found.');
  sendResponse(res, { data: program, message: 'Program updated successfully.' });
});

/**
 * DELETE /programs/:id (admin)
 */
export const deleteProgram = catchAsync(async (req, res) => {
  const program = await Program.findByIdAndDelete(req.params.id);
  if (!program) throw new ApiError(404, 'Program not found.');
  sendResponse(res, { data: program, message: 'Program deleted successfully.' });
});
