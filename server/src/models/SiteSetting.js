import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      trim: true,
      default: 'Bhawna Foundation',
    },
    logo: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    socialLinks: {
      facebook: { type: String, trim: true, default: '' },
      twitter: { type: String, trim: true, default: '' },
      instagram: { type: String, trim: true, default: '' },
      youtube: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' },
    },
    footerText: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Get or create the singleton site settings document.
 */
siteSettingSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      siteName: 'Bhawna Foundation',
      contactEmail: 'info@bhawnafoundation.org',
      phone: '+91 98765 43210',
      address: 'Jaipur, Rajasthan, India',
    });
  }
  return settings;
};

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);
export default SiteSetting;
