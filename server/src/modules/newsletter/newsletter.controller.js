import NewsletterSubscriber from '../../models/NewsletterSubscriber.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

/** POST /newsletter (public - subscribe) */
export const subscribe = catchAsync(async (req, res) => {
  const { email } = req.body;

  // Check if already subscribed
  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing) {
    if (existing.isActive) {
      return sendResponse(res, { message: 'You are already subscribed to our newsletter.' });
    }
    // Reactivate
    existing.isActive = true;
    await existing.save();
    return sendResponse(res, { data: existing, message: 'Newsletter subscription reactivated.' });
  }

  const subscriber = await NewsletterSubscriber.create({ email });
  sendResponse(res, { statusCode: 201, data: subscriber, message: 'Successfully subscribed to newsletter.' });
});

/** POST /newsletter/unsubscribe (public) */
export const unsubscribe = catchAsync(async (req, res) => {
  const { email } = req.body;
  const subscriber = await NewsletterSubscriber.findOneAndUpdate(
    { email },
    { isActive: false },
    { new: true },
  );
  if (!subscriber) throw new ApiError(404, 'Subscriber not found.');
  sendResponse(res, { data: subscriber, message: 'Successfully unsubscribed from newsletter.' });
});

/** GET /newsletter (admin) */
export const getSubscribers = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
  if (req.query.search) filter.email = { $regex: req.query.search, $options: 'i' };

  const [data, total] = await Promise.all([
    NewsletterSubscriber.find(filter).sort(sort).skip(skip).limit(limit),
    NewsletterSubscriber.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Subscribers fetched successfully.' });
});

/** DELETE /newsletter/:id (admin) */
export const deleteSubscriber = catchAsync(async (req, res) => {
  const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
  if (!subscriber) throw new ApiError(404, 'Subscriber not found.');
  sendResponse(res, { data: subscriber, message: 'Subscriber deleted successfully.' });
});
