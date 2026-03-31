import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { ApiError } from '../utils/api-error.js';

/**
 * Require admin authentication via JWT Bearer token.
 * Supports a mock mode for local development.
 */
export function requireAdminAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    next(new ApiError(401, 'Authentication token is required.'));
    return;
  }

  // Mock mode for development
  if (env.ADMIN_AUTH_MODE === 'mock') {
    if (token !== 'dev-admin-token') {
      next(new ApiError(401, 'Invalid mock admin token.'));
      return;
    }

    req.admin = {
      id: 'dev-admin',
      name: 'Foundation Admin',
      email: 'admin@bhawnafoundation.org',
      role: 'super_admin',
    };

    next();
    return;
  }

  // Real JWT verification
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired authentication token.'));
  }
}

/**
 * Role-based access control middleware.
 * Must be used AFTER requireAdminAuth.
 *
 * @param  {...string} roles - Allowed roles (e.g. 'super_admin', 'admin')
 */
export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.admin) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    if (!roles.includes(req.admin.role)) {
      return next(
        new ApiError(403, `Access denied. Required role: ${roles.join(' or ')}.`),
      );
    }

    next();
  };
}