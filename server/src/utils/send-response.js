export function sendResponse(res, { statusCode = 200, message = 'Success', data = null, meta = null }) {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    meta,
  });
}