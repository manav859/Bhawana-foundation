import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    relatedEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
    relatedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    altText: {
      type: String,
      trim: true,
      maxlength: [300, 'Alt text cannot exceed 300 characters'],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
galleryItemSchema.index({ category: 1 });
galleryItemSchema.index({ relatedEvent: 1 });
galleryItemSchema.index({ relatedProject: 1 });
galleryItemSchema.index({ createdAt: -1 });

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;
