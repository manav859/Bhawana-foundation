import Joi from 'joi';
const createProjectSchema = Joi.object({
  title: Joi.string().max(200).required(),
  slug: Joi.string().allow(''),
  shortDescription: Joi.string().max(300).allow(''),
  fullDescription: Joi.string().allow(''),
  category: Joi.string().allow(''),
  location: Joi.string().allow(''),
  impactStats: Joi.object().default({}),
  beneficiaries: Joi.number().min(0).default(0),
  images: Joi.array().items(Joi.string()).default([]),
  relatedProgram: Joi.string().hex().length(24).allow(null, ''),
  isFeatured: Joi.boolean().default(false),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

const formData = {
    title: 'New Project',
    slug: '',
    shortDescription: 'test',
    fullDescription: 'test content',
    category: 'Education',
    location: 'India',
    beneficiaries: 0,
    status: 'draft',
    isFeatured: false,
    images: []
};

// Simulate what happens in validate-request middleware
const { error, value } = createProjectSchema.validate(formData, {
  abortEarly: false,
  stripUnknown: true,
});

if (error) {
  console.log('Joi Validation Error:', JSON.stringify(error.details, null, 2));
} else {
  console.log('Joi Validation Success:', value);
}
