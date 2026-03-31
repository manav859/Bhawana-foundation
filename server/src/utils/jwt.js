import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Sign a JWT token with the given payload.
 */
export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode a JWT token.
 * Returns the decoded payload or throws on invalid/expired tokens.
 */
export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}
