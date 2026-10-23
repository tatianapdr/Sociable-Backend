// Shared validation helpers used by every model --------
export const isNonEmptyString = (value, maxLength) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;

export const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

// Accepts "YYYY-MM-DD HH:MM", "YYYY-MM-DD HH:MM:SS" or the same with a "T"
const DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2})?$/;

export const isDateTime = (value) => typeof value === 'string' && DATETIME_PATTERN.test(value) && !isNaN(new Date(value.replace(' ', 'T')));

// Conformance: always store as "YYYY-MM-DD HH:MM:SS"
export const toDatabaseDateTime = (value) => {
  const normalised = value.replace('T', ' ');
  return normalised.length === 16 ? `${normalised}:00` : normalised;
};
