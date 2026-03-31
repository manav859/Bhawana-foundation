import mongoSanitize from 'express-mongo-sanitize';

/**
 * Sanitize request data to prevent NoSQL injection attacks.
 * Removes any keys that start with '$' or contain '.'.
 */
export const sanitize = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`[SECURITY] Request sanitized: key '${key}' removed from ${req.originalUrl}`);
  },
});
