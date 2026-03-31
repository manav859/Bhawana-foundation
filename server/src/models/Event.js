import mongoose from 'mongoose';
import { generateSlug } from '../utils/slug.js';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['upcoming', 'past', 'draft'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ status: 1, isFeatured: 1 });
eventSchema.index({ date: -1 });
eventSchema.index({ category: 1 });

// Pre-validate: generate slug
eventSchema.pre('validate', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = generateSlug(this.title);
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
