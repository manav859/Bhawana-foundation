import VolunteerApplication from '../../models/VolunteerApplication.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/** POST /volunteers (public) */
export const createVolunteer = catchAsync(async (req, res) => {
  const application = await VolunteerApplication.create(req.body);
  sendResponse(res, { statusCode: 201, data: application, message: 'Volunteer application submitted successfully.' });
});

/** GET /volunteers (admin) */
export const getVolunteers = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    VolunteerApplication.find(filter).sort(sort).skip(skip).limit(limit),
    VolunteerApplication.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Volunteer applications fetched successfully.' });
});

/** GET /volunteers/:id (admin) */
export const getVolunteer = catchAsync(async (req, res) => {
  const volunteer = await VolunteerApplication.findById(req.params.id);
  if (!volunteer) throw new ApiError(404, 'Volunteer application not found.');
  sendResponse(res, { data: volunteer, message: 'Volunteer application fetched successfully.' });
});

/** PATCH /volunteers/:id (admin) */
export const updateVolunteer = catchAsync(async (req, res) => {
  const volunteer = await VolunteerApplication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!volunteer) throw new ApiError(404, 'Volunteer application not found.');
  sendResponse(res, { data: volunteer, message: 'Volunteer application updated successfully.' });
});

/** DELETE /volunteers/:id (admin) */
export const deleteVolunteer = catchAsync(async (req, res) => {
  const volunteer = await VolunteerApplication.findByIdAndDelete(req.params.id);
  if (!volunteer) throw new ApiError(404, 'Volunteer application not found.');
  sendResponse(res, { data: volunteer, message: 'Volunteer application deleted successfully.' });
});
