import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [150, 'Name cannot exceed 150 characters'],
    },
    logo: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
partnerSchema.index({ isActive: 1, order: 1 });

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
