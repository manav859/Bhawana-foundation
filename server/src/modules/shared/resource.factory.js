import express from 'express';
import { randomUUID } from 'node:crypto';
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from '../../constants/app.constants.js';
import { placeholderResources } from '../../constants/placeholder-content.js';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { sendResponse } from '../../utils/send-response.js';

const resourceStore = Object.fromEntries(
  Object.entries(placeholderResources).map(([key, value]) => [key, value.map((item) => ({ ...item }))]),
);

function paginate(items, query) {
  const page = Math.max(Number(query.page) || DEFAULT_PAGE, 1);
  const limit = Math.min(Math.max(Number(query.limit) || DEFAULT_LIMIT, 1), MAX_LIMIT);
  const search = String(query.search || '').trim().toLowerCase();

  const filteredItems = search
    ? items.filter((item) => JSON.stringify(item).toLowerCase().includes(search))
    : items;

  const start = (page - 1) * limit;
  const data = filteredItems.slice(start, start + limit);

  return {
    data,
    meta: {
      page,
      limit,
      total: filteredItems.length,
    },
  };
}

function buildSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function createResourceRouter(resourceKey, options = {}) {
  const router = express.Router();
  const slugField = options.slugField || 'slug';
  const publicRead = options.publicRead !== false;
  const allowPublicCreate = options.allowPublicCreate === true;
  const readMiddleware = publicRead ? [] : [requireAdminAuth];
  const createMiddleware = allowPublicCreate ? [] : [requireAdminAuth];

  router.get(
    '/',
    ...readMiddleware,
    catchAsync(async (req, res) => {
      const { data, meta } = paginate(resourceStore[resourceKey] || [], req.query);
      sendResponse(res, {
        data,
        meta,
        message: `${resourceKey} fetched successfully.`,
      });
    }),
  );

  router.get(
    '/:identifier',
    ...readMiddleware,
    catchAsync(async (req, res) => {
      const item = (resourceStore[resourceKey] || []).find(
        (entry) => entry.id === req.params.identifier || entry[slugField] === req.params.identifier,
      );

      if (!item) {
        throw new ApiError(404, `${resourceKey.slice(0, -1)} not found.`);
      }

      sendResponse(res, {
        data: item,
        message: `${resourceKey.slice(0, -1)} fetched successfully.`,
      });
    }),
  );

  router.post(
    '/',
    ...createMiddleware,
    catchAsync(async (req, res) => {
      const nextItem = {
        id: randomUUID(),
        ...req.body,
      };

      if (!nextItem[slugField] && nextItem.title) {
        nextItem[slugField] = buildSlug(nextItem.title);
      }

      resourceStore[resourceKey].unshift(nextItem);

      sendResponse(res, {
        statusCode: 201,
        data: nextItem,
        message: `${resourceKey.slice(0, -1)} created successfully.`,
      });
    }),
  );

  router.patch(
    '/:identifier',
    requireAdminAuth,
    catchAsync(async (req, res) => {
      const index = resourceStore[resourceKey].findIndex(
        (entry) => entry.id === req.params.identifier || entry[slugField] === req.params.identifier,
      );

      if (index === -1) {
        throw new ApiError(404, `${resourceKey.slice(0, -1)} not found.`);
      }

      resourceStore[resourceKey][index] = {
        ...resourceStore[resourceKey][index],
        ...req.body,
      };

      sendResponse(res, {
        data: resourceStore[resourceKey][index],
        message: `${resourceKey.slice(0, -1)} updated successfully.`,
      });
    }),
  );

  router.delete(
    '/:identifier',
    requireAdminAuth,
    catchAsync(async (req, res) => {
      const index = resourceStore[resourceKey].findIndex(
        (entry) => entry.id === req.params.identifier || entry[slugField] === req.params.identifier,
      );

      if (index === -1) {
        throw new ApiError(404, `${resourceKey.slice(0, -1)} not found.`);
      }

      const [removedItem] = resourceStore[resourceKey].splice(index, 1);

      sendResponse(res, {
        data: removedItem,
        message: `${resourceKey.slice(0, -1)} deleted successfully.`,
      });
    }),
  );

  return router;
}