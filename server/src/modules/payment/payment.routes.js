import express from 'express';
import { requireBuyerAuth } from '../../middlewares/buyer-auth.middleware.js';
import { createRazorpayOrder, verifyPayment, mockVerifyPayment } from './payment.controller.js';

export const paymentRouter = express.Router();

paymentRouter.post('/create-order', requireBuyerAuth, createRazorpayOrder);
paymentRouter.post('/verify', requireBuyerAuth, verifyPayment);
paymentRouter.post('/mock-verify', requireBuyerAuth, mockVerifyPayment);
