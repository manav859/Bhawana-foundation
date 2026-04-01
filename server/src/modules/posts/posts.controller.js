import BlogPost from '../../models/BlogPost.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

export const getPosts = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = { status: 'published' };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    BlogPost.find(filter).sort(sort).skip(skip).limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Blog posts fetched successfully.' });
});

export const getAllPosts = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

  const [data, total] = await Promise.all([
    BlogPost.find(filter).sort(sort).skip(skip).limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'All blog posts fetched successfully.' });
});

export const getPost = catchAsync(async (req, res) => {
  const { identifier } = req.params;
  const query = identifier.match(/^[0-9a-fA-F]{24}$/) ? { _id: identifier } : { slug: identifier };
  const post = await BlogPost.findOne({ ...query, status: 'published' });
  if (!post) throw new ApiError(404, 'Blog post not found.');
  sendResponse(res, { data: post, message: 'Blog post fetched successfully.' });
});

export const createPost = catchAsync(async (req, res) => {
  const post = await BlogPost.create(req.body);
  sendResponse(res, { statusCode: 201, data: post, message: 'Blog post created successfully.' });
});

export const updatePost = catchAsync(async (req, res) => {
  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!post) throw new ApiError(404, 'Blog post not found.');
  sendResponse(res, { data: post, message: 'Blog post updated successfully.' });
});

export const deletePost = catchAsync(async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) throw new ApiError(404, 'Blog post not found.');
  sendResponse(res, { data: post, message: 'Blog post deleted successfully.' });
});
