import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Amount must be at least 1'],
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
      trim: true,
    },
    donorName: {
      type: String,
      trim: true,
      maxlength: [100, 'Donor name cannot exceed 100 characters'],
    },
    donorEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    donorPhone: {
      type: String,
      trim: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    paymentProvider: {
      type: String,
      trim: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
donationSchema.index({ paymentStatus: 1 });
donationSchema.index({ donorEmail: 1 });
donationSchema.index({ createdAt: -1 });
donationSchema.index({ campaign: 1 });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
