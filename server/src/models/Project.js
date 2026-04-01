import mongoose from 'mongoose';
import { generateSlug } from '../utils/slug.js';

const projectSchema = new mongoose.Schema(
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
    category: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    impactStats: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    beneficiaries: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    relatedProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
projectSchema.index({ status: 1, isFeatured: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ relatedProgram: 1 });

// Pre-validate: generate slug
projectSchema.pre('validate', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = generateSlug(this.title);
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
