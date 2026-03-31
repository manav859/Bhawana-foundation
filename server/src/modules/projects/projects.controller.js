import Project from '../../models/Project.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { buildPagination, buildPaginationMeta, buildSort } from '../../utils/pagination.js';
import { sendResponse } from '../../utils/send-response.js';

export const getProjects = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = { status: 'published' };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    Project.find(filter).populate('relatedProgram', 'title slug').sort(sort).skip(skip).limit(limit),
    Project.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'Projects fetched successfully.' });
});

export const getAllProjects = catchAsync(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const sort = buildSort(req.query.sort);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

  const [data, total] = await Promise.all([
    Project.find(filter).populate('relatedProgram', 'title slug').sort(sort).skip(skip).limit(limit),
    Project.countDocuments(filter),
  ]);

  sendResponse(res, { data, meta: buildPaginationMeta(total, page, limit), message: 'All projects fetched successfully.' });
});

export const getProject = catchAsync(async (req, res) => {
  const { identifier } = req.params;
  const query = identifier.match(/^[0-9a-fA-F]{24}$/) ? { _id: identifier } : { slug: identifier };
  const project = await Project.findOne({ ...query, status: 'published' }).populate('relatedProgram', 'title slug');
  if (!project) throw new ApiError(404, 'Project not found.');
  sendResponse(res, { data: project, message: 'Project fetched successfully.' });
});

export const createProject = catchAsync(async (req, res) => {
  const project = await Project.create(req.body);
  sendResponse(res, { statusCode: 201, data: project, message: 'Project created successfully.' });
});

export const updateProject = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) throw new ApiError(404, 'Project not found.');
  sendResponse(res, { data: project, message: 'Project updated successfully.' });
});

export const deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found.');
  sendResponse(res, { data: project, message: 'Project deleted successfully.' });
});
