import Donation from '../../models/Donation.js';
import Event from '../../models/Event.js';
import Project from '../../models/Project.js';
import VolunteerApplication from '../../models/VolunteerApplication.js';
import ContactInquiry from '../../models/ContactInquiry.js';
import BlogPost from '../../models/BlogPost.js';
import Program from '../../models/Program.js';
import NewsletterSubscriber from '../../models/NewsletterSubscriber.js';
import { catchAsync } from '../../utils/catch-async.js';
import { sendResponse } from '../../utils/send-response.js';

/**
 * GET /dashboard/stats
 * Returns aggregate counts for the admin dashboard.
 */
export const getDashboardStats = catchAsync(async (_req, res) => {
  const [
    totalDonations,
    totalDonationAmount,
    totalEvents,
    totalProjects,
    totalPrograms,
    totalVolunteers,
    totalContacts,
    totalBlogs,
    totalSubscribers,
    recentDonations,
    recentVolunteers,
    recentContacts,
  ] = await Promise.all([
    Donation.countDocuments(),
    Donation.aggregate([
      { $match: { paymentStatus: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Event.countDocuments(),
    Project.countDocuments(),
    Program.countDocuments(),
    VolunteerApplication.countDocuments(),
    ContactInquiry.countDocuments(),
    BlogPost.countDocuments(),
    NewsletterSubscriber.countDocuments({ isActive: true }),
    Donation.find().sort({ createdAt: -1 }).limit(5).lean(),
    VolunteerApplication.find().sort({ createdAt: -1 }).limit(5).lean(),
    ContactInquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  sendResponse(res, {
    data: {
      counts: {
        donations: totalDonations,
        donationAmount: totalDonationAmount[0]?.total || 0,
        events: totalEvents,
        projects: totalProjects,
        programs: totalPrograms,
        volunteers: totalVolunteers,
        contacts: totalContacts,
        blogs: totalBlogs,
        subscribers: totalSubscribers,
      },
      recent: {
        donations: recentDonations,
        volunteers: recentVolunteers,
        contacts: recentContacts,
      },
    },
    message: 'Dashboard stats fetched successfully.',
  });
});
