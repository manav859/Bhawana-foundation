import crypto from 'node:crypto';

export function requestContext(req, _res, next) {
  req.requestId = crypto.randomUUID();
  next();
}