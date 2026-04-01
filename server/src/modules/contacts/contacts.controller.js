import ContactInquiry from '../../models/ContactInquiry.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/** POST /contacts (public) */
export const createContact = catchAsync(async (req, res) => {
  const contact = await ContactInquiry.create(req.body);
  sendResponse(res, { statusCode: 201, data: contact, message: 'Contact inquiry submitted successfully.' });
});

/** GET /contacts (admin) */
export const getContacts = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
      { subject: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    ContactInquiry.find(filter).sort(sort).skip(skip).limit(limit),
    ContactInquiry.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Contact inquiries fetched successfully.' });
});

/** GET /contacts/:id (admin) */
export const getContact = catchAsync(async (req, res) => {
  const contact = await ContactInquiry.findById(req.params.id);
  if (!contact) throw new ApiError(404, 'Contact inquiry not found.');
  sendResponse(res, { data: contact, message: 'Contact inquiry fetched successfully.' });
});

/** PATCH /contacts/:id (admin) */
export const updateContact = catchAsync(async (req, res) => {
  const contact = await ContactInquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!contact) throw new ApiError(404, 'Contact inquiry not found.');
  sendResponse(res, { data: contact, message: 'Contact inquiry updated successfully.' });
});

/** DELETE /contacts/:id (admin) */
export const deleteContact = catchAsync(async (req, res) => {
  const contact = await ContactInquiry.findByIdAndDelete(req.params.id);
  if (!contact) throw new ApiError(404, 'Contact inquiry not found.');
  sendResponse(res, { data: contact, message: 'Contact inquiry deleted successfully.' });
});
