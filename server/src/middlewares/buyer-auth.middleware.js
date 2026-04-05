import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import Buyer from '../models/Buyer.js';
import { ApiError } from '../utils/api-error.js';

/**
 * Require buyer authentication via JWT Bearer token.
 * Attaches req.buyer with buyer data.
 */
export function requireBuyerAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, 'Please log in to continue.'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (decoded.role !== 'buyer') {
      return next(new ApiError(401, 'Invalid buyer token.'));
    }

    req.buyer = decoded;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token. Please log in again.'));
  }
}
