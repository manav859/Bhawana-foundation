import mongoose from 'mongoose';

const volunteerApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'accepted', 'rejected'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
volunteerApplicationSchema.index({ status: 1 });
volunteerApplicationSchema.index({ email: 1 });
volunteerApplicationSchema.index({ createdAt: -1 });

const VolunteerApplication = mongoose.model('VolunteerApplication', volunteerApplicationSchema);
export default VolunteerApplication;
