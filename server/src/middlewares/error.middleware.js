import { isProduction } from '../config/env.js';

/**
 * Centralized error handler middleware.
 *
 * Handles:
 * - ApiError instances (custom errors)
 * - Mongoose validation errors
 * - Mongoose duplicate key errors
 * - Mongoose cast errors (invalid ObjectId)
 * - JWT errors
 * - Multer file upload errors
 * - Generic errors
 */
export function errorHandler(error, req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error.';
  let details = error.details || null;

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    const fieldErrors = Object.values(error.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    message = 'Validation failed.';
    details = fieldErrors;
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyValue || {})[0] || 'field';
    message = `Duplicate value for '${field}'. This ${field} already exists.`;
  }

  // Mongoose CastError (bad ObjectId)
  if (error.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token.';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired.';
  }

  // Multer file size error
  if (error.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = 'File size exceeds the maximum limit.';
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = 'Unexpected file field.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    details,
    requestId: req.requestId || null,
    ...(isProduction ? {} : { stack: error.stack }),
  });
}