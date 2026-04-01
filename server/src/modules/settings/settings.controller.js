import SiteSetting from '../../models/SiteSetting.js';
import { catchAsync } from '../../utils/catch-async.js';
import { sendResponse } from '../../utils/send-response.js';

/** GET /settings/public-shell (public) */
export const getPublicShellSettings = catchAsync(async (_req, res) => {
  const settings = await SiteSetting.getSettings();
  sendResponse(res, {
    data: {
      organizationName: settings.siteName,
      tagline: 'Compassion-led community impact across India.',
      location: settings.address,
      email: settings.contactEmail,
      phone: settings.phone,
      socialLinks: settings.socialLinks,
    },
    message: 'Public shell settings fetched successfully.',
  });
});

/** GET /settings (admin) */
export const getAdminSettings = catchAsync(async (_req, res) => {
  const settings = await SiteSetting.getSettings();
  sendResponse(res, { data: settings, message: 'Admin settings fetched successfully.' });
});

/** PATCH /settings (admin) */
export const updateAdminSettings = catchAsync(async (req, res) => {
  let settings = await SiteSetting.getSettings();
  Object.assign(settings, req.body);
  await settings.save();
  sendResponse(res, { data: settings, message: 'Settings updated successfully.' });
});