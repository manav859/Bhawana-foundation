import Event from '../../models/Event.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

export const getEvents = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort || 'date:desc');
  const filter = { status: { $in: ['upcoming', 'past'] } };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    Event.find(filter).sort(sort).skip(skip).limit(limit),
    Event.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Events fetched successfully.' });
});

export const getAllEvents = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

  const [data, total] = await Promise.all([
    Event.find(filter).sort(sort).skip(skip).limit(limit),
    Event.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'All events fetched successfully.' });
});

export const getEvent = catchAsync(async (req, res) => {
  const { identifier } = req.params;
  const query = identifier.match(/^[0-9a-fA-F]{24}$/) ? { _id: identifier } : { slug: identifier };
  const event = await Event.findOne({ ...query, status: { $ne: 'draft' } });
  if (!event) throw new ApiError(404, 'Event not found.');
  sendResponse(res, { data: event, message: 'Event fetched successfully.' });
});

export const getAdminEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) throw new ApiError(404, 'Event not found.');
  sendResponse(res, { data: event, message: 'Admin event fetched successfully.' });
});

export const createEvent = catchAsync(async (req, res) => {
  const event = await Event.create(req.body);
  sendResponse(res, { statusCode: 201, data: event, message: 'Event created successfully.' });
});

export const updateEvent = catchAsync(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!event) throw new ApiError(404, 'Event not found.');
  sendResponse(res, { data: event, message: 'Event updated successfully.' });
});

export const deleteEvent = catchAsync(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) throw new ApiError(404, 'Event not found.');
  sendResponse(res, { data: event, message: 'Event deleted successfully.' });
});
