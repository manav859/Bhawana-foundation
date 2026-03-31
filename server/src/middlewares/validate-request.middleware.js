import { ApiError } from '../utils/api-error.js';

/**
 * Validate request body/query/params using a Joi schema.
 *
 * @param {import('joi').ObjectSchema} schema - Joi validation schema
 * @param {'body'|'query'|'params'} source - Which part of the request to validate
 */
export function validate(schema, source = 'body') {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, ''),
      }));

      return next(new ApiError(400, 'Validation failed.', details));
    }

    // Replace source data with validated (and stripped) data
    req[source] = value;
    next();
  };
}