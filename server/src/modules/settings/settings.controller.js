import { publicShellSettings } from '../../constants/placeholder-content.js';
import { sendResponse } from '../../utils/send-response.js';

const mutableSettings = { ...publicShellSettings };

export function getPublicShellSettings(_req, res) {
  sendResponse(res, {
    data: mutableSettings,
    message: 'Public shell settings fetched successfully.',
  });
}

export function getAdminSettings(_req, res) {
  sendResponse(res, {
    data: mutableSettings,
    message: 'Admin settings fetched successfully.',
  });
}

export function updateAdminSettings(req, res) {
  Object.assign(mutableSettings, req.body || {});

  sendResponse(res, {
    data: mutableSettings,
    message: 'Settings updated successfully.',
  });
}