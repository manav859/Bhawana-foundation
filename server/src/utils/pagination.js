import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from '../constants/app.constants.js';

/**
 * Build pagination options from query params.
 * Returns { page, limit, skip } for use with Mongoose queries.
 */
export function buildPagination(query = {}) {
  const page = Math.max(Number(query.page) || DEFAULT_PAGE, 1);
  const limit = Math.min(Math.max(Number(query.limit) || DEFAULT_LIMIT, 1), MAX_LIMIT);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Build the meta object for paginated responses.
 */
export function buildPaginationMeta(total, page, limit) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Build Mongoose sort object from query string.
 * Example: "createdAt:desc,title:asc" → { createdAt: -1, title: 1 }
 * Default sort: { createdAt: -1 }
 */
export function buildSort(sortQuery) {
  if (!sortQuery) return { createdAt: -1 };

  const sortObj = {};
  const pairs = String(sortQuery).split(',');

  for (const pair of pairs) {
    const [field, direction] = pair.split(':');
    if (field) {
      sortObj[field.trim()] = direction?.trim() === 'asc' ? 1 : -1;
    }
  }

  return Object.keys(sortObj).length > 0 ? sortObj : { createdAt: -1 };
}
