import Donation from '../../models/Donation.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/**
 * POST /donations (public – create a new donation record)
 */
export const createDonation = catchAsync(async (req, res) => {
  const donation = await Donation.create(req.body);
  sendResponse(res, { statusCode: 201, data: donation, message: 'Donation recorded successfully.' });
});

/**
 * GET /donations (admin – list all donations)
 */
export const getDonations = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;
  if (req.query.search) {
    filter.$or = [
      { donorName: { $regex: req.query.search, $options: 'i' } },
      { donorEmail: { $regex: req.query.search, $options: 'i' } },
      { transactionId: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    Donation.find(filter).populate('campaign', 'title').sort(sort).skip(skip).limit(limit),
    Donation.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Donations fetched successfully.' });
});

/**
 * GET /donations/:id (admin)
 */
export const getDonation = catchAsync(async (req, res) => {
  const donation = await Donation.findById(req.params.id).populate('campaign', 'title');
  if (!donation) throw new ApiError(404, 'Donation not found.');
  sendResponse(res, { data: donation, message: 'Donation fetched successfully.' });
});

/**
 * PATCH /donations/:id (admin – update status)
 */
export const updateDonation = catchAsync(async (req, res) => {
  const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!donation) throw new ApiError(404, 'Donation not found.');
  sendResponse(res, { data: donation, message: 'Donation updated successfully.' });
});

/**
 * DELETE /donations/:id (admin)
 */
export const deleteDonation = catchAsync(async (req, res) => {
  const donation = await Donation.findByIdAndDelete(req.params.id);
  if (!donation) throw new ApiError(404, 'Donation not found.');
  sendResponse(res, { data: donation, message: 'Donation deleted successfully.' });
});
