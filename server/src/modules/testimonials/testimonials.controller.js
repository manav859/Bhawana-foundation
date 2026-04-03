import Testimonial from '../../models/Testimonial.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/** GET /testimonials (public) */
export const getTestimonials = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    Testimonial.find(filter).sort(sort).skip(skip).limit(limit),
    Testimonial.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Testimonials fetched successfully.' });
});

/** POST /testimonials/submit (public) */
export const submitTestimonial = catchAsync(async (req, res) => {
  const { name, role, quote } = req.body;
  const testimonial = await Testimonial.create({
    name,
    role,
    quote,
    isFeatured: false, // Ensure public submissions are never featured by default
  });
  sendResponse(res, { statusCode: 201, data: testimonial, message: 'Testimonial submitted successfully.' });
});

/** GET /testimonials/:id */
export const getTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found.');
  sendResponse(res, { data: testimonial, message: 'Testimonial fetched successfully.' });
});

/** POST /testimonials (admin) */
export const createTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  sendResponse(res, { statusCode: 201, data: testimonial, message: 'Testimonial created successfully.' });
});

/** PATCH /testimonials/:id (admin) */
export const updateTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!testimonial) throw new ApiError(404, 'Testimonial not found.');
  sendResponse(res, { data: testimonial, message: 'Testimonial updated successfully.' });
});

/** DELETE /testimonials/:id (admin) */
export const deleteTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found.');
  sendResponse(res, { data: testimonial, message: 'Testimonial deleted successfully.' });
});
