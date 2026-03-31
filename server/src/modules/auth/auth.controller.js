import { env } from '../../config/env.js';
import User from '../../models/User.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { signToken } from '../../utils/jwt.js';
import { sendResponse } from '../../utils/send-response.js';

/**
 * POST /auth/admin/login
 * Admin login – supports mock mode and real JWT mode.
 */
export const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Mock mode for development
  if (env.ADMIN_AUTH_MODE === 'mock') {
    return sendResponse(res, {
      data: {
        token: 'dev-admin-token',
        admin: {
          id: 'dev-admin',
          name: 'Foundation Admin',
          email,
          role: 'super_admin',
        },
      },
      message: 'Mock admin login succeeded.',
    });
  }

  // Real authentication
  const user = await User.findOne({ email, isActive: true }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const token = signToken({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  sendResponse(res, {
    data: {
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    message: 'Login successful.',
  });
});

/**
 * GET /auth/admin/me
 * Get current admin profile from JWT.
 */
export const adminMe = catchAsync(async (req, res) => {
  sendResponse(res, {
    data: req.admin,
    message: 'Admin session resolved successfully.',
  });
});

/**
 * POST /auth/admin/logout
 * Logout (client-side token invalidation).
 */
export const adminLogout = catchAsync(async (_req, res) => {
  sendResponse(res, {
    data: { loggedOut: true },
    message: 'Admin logout completed.',
  });
});