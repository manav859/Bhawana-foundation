/**
 * Formats a Date object or ISO string into { month, day } for event badges.
 * @param {Date|string} date 
 * @returns {Object} { month: string, day: string }
 */
export function formatEventDate(date) {
  if (!date) return { month: 'TBD', day: '--' };
  const d = new Date(date);
  return {
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate().toString().padStart(2, '0')
  };
}

/**
 * Formats a full date string.
 * @param {Date|string} date 
 * @returns {string} 
 */
export function formatDateLong(date) {
  if (!date) return 'Date TBD';
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Formats a full date string into a readable short format (e.g., Oct 12, 2024).
 * @param {Date|string} date 
 * @returns {string} 
 */
export function formatDate(date) {
  if (!date) return 'Date TBD';
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Formats numbers with commas.
 * @param {number} num 
 * @returns {string}
 */
export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return Number(num).toLocaleString();
}
