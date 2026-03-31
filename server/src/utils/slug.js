/**
 * Generate a URL-friendly slug from a string.
 * Optionally appends a short random suffix for uniqueness.
 */
export function generateSlug(text, options = {}) {
  const { unique = false } = options;

  let slug = String(text || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')     // remove non-word chars (except spaces & hyphens)
    .replace(/[\s_]+/g, '-')      // replace spaces & underscores with hyphens
    .replace(/-+/g, '-')          // collapse consecutive hyphens
    .replace(/(^-|-$)/g, '');     // trim leading/trailing hyphens

  if (unique) {
    const suffix = Date.now().toString(36).slice(-4);
    slug = `${slug}-${suffix}`;
  }

  return slug;
}
