import jwt from 'jsonwebtoken';
import Buyer from '../../models/Buyer.js';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/api-error.js';
import { catchAsync } from '../../utils/catch-async.js';
import { sendResponse } from '../../utils/send-response.js';

function signToken(buyer) {
  return jwt.sign(
    { id: buyer._id, email: buyer.email, role: 'buyer' },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  );
}

export const register = catchAsync(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existing = await Buyer.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists.');
  }

  const buyer = await Buyer.create({ name, email, password, phone });
  const token = signToken(buyer);

  sendResponse(res, {
    statusCode: 201,
    data: { buyer, token },
    message: 'Account created successfully.',
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const buyer = await Buyer.findOne({ email, isActive: true }).select('+password');
  if (!buyer || !(await buyer.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const token = signToken(buyer);

  sendResponse(res, {
    data: { buyer, token },
    message: 'Logged in successfully.',
  });
});

export const getProfile = catchAsync(async (req, res) => {
  const buyer = await Buyer.findById(req.buyer.id);
  if (!buyer) throw new ApiError(404, 'Account not found.');

  sendResponse(res, { data: buyer, message: 'Profile fetched.' });
});

export const updateProfile = catchAsync(async (req, res) => {
  const updates = req.body;
  // Don't allow password or email changes through this endpoint
  delete updates.password;
  delete updates.email;

  const buyer = await Buyer.findByIdAndUpdate(req.buyer.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!buyer) throw new ApiError(404, 'Account not found.');

  sendResponse(res, { data: buyer, message: 'Profile updated.' });
});
