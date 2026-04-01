import GalleryItem from '../../models/GalleryItem.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/** GET /gallery (public) */
export const getGalleryItems = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.category) filter.category = req.query.category;

  const [data, total] = await Promise.all([
    GalleryItem.find(filter).sort(sort).skip(skip).limit(limit),
    GalleryItem.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Gallery items fetched successfully.' });
});

/** GET /gallery/:id */
export const getGalleryItem = catchAsync(async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Gallery item not found.');
  sendResponse(res, { data: item, message: 'Gallery item fetched successfully.' });
});

/** POST /gallery (admin) */
export const createGalleryItem = catchAsync(async (req, res) => {
  const item = await GalleryItem.create(req.body);
  sendResponse(res, { statusCode: 201, data: item, message: 'Gallery item created successfully.' });
});

/** PATCH /gallery/:id (admin) */
export const updateGalleryItem = catchAsync(async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Gallery item not found.');
  sendResponse(res, { data: item, message: 'Gallery item updated successfully.' });
});

/** DELETE /gallery/:id (admin) */
export const deleteGalleryItem = catchAsync(async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Gallery item not found.');
  sendResponse(res, { data: item, message: 'Gallery item deleted successfully.' });
});
