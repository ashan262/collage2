/**
 * Utility functions for handling image URLs
 * Supports both local storage and Cloudinary URLs
 */

// Get the base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Get the complete image URL for display
 * @param {string} imageUrl - The image URL from the API response
 * @returns {string} Complete URL for image display
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // If it's already a complete URL (Cloudinary or external), return as-is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // If it's a relative path (local storage), prepend API base URL
  if (imageUrl.startsWith("/uploads/")) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  // If it's just a filename or partial path, assume it's in uploads
  return `${API_BASE_URL}/uploads/${imageUrl}`;
};

/**
 * Get a thumbnail URL for an image
 * @param {string} imageUrl - Original image URL
 * @param {number} width - Thumbnail width (default: 400)
 * @param {number} height - Thumbnail height (default: 300)
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (imageUrl, width = 400, height = 300) => {
  if (!imageUrl) return null;

  // If it's a Cloudinary URL, generate thumbnail transformation
  if (imageUrl.includes("cloudinary.com")) {
    return imageUrl.replace(
      "/upload/",
      `/upload/w_${width},h_${height},c_fill,f_auto,q_auto/`
    );
  }

  // For local images, return the original (no transformation available)
  return getImageUrl(imageUrl);
};

/**
 * Get a responsive image URL for different screen sizes
 * @param {string} imageUrl - Original image URL
 * @param {string} size - Size preset ('small', 'medium', 'large')
 * @returns {string} Responsive image URL
 */
export const getResponsiveImageUrl = (imageUrl, size = "medium") => {
  if (!imageUrl) return null;

  const sizes = {
    small: "w_600,f_auto,q_auto",
    medium: "w_1200,f_auto,q_auto",
    large: "w_1920,f_auto,q_auto",
  };

  // If it's a Cloudinary URL, apply responsive transformation
  if (imageUrl.includes("cloudinary.com")) {
    return imageUrl.replace("/upload/", `/upload/${sizes[size]}/`);
  }

  // For local images, return the original
  return getImageUrl(imageUrl);
};

/**
 * Get an optimized image URL with custom transformations
 * @param {string} imageUrl - Original image URL
 * @param {object} transformations - Transformation parameters
 * @returns {string} Transformed image URL
 */
export const getOptimizedImageUrl = (imageUrl, transformations = {}) => {
  if (!imageUrl) return null;

  // If it's a Cloudinary URL, apply transformations
  if (imageUrl.includes("cloudinary.com")) {
    const {
      width,
      height,
      crop = "fill",
      quality = "auto",
      format = "auto",
      gravity,
      ...otherParams
    } = transformations;

    let transform = [];

    if (width) transform.push(`w_${width}`);
    if (height) transform.push(`h_${height}`);
    if (crop) transform.push(`c_${crop}`);
    if (gravity) transform.push(`g_${gravity}`);
    if (quality) transform.push(`q_${quality}`);
    if (format) transform.push(`f_${format}`);

    // Add any other parameters
    Object.entries(otherParams).forEach(([key, value]) => {
      transform.push(`${key}_${value}`);
    });

    const transformString = transform.join(",");
    return imageUrl.replace("/upload/", `/upload/${transformString}/`);
  }

  // For local images, return the original
  return getImageUrl(imageUrl);
};

/**
 * Generate a placeholder image URL
 * @param {number} width - Placeholder width
 * @param {number} height - Placeholder height
 * @param {string} text - Placeholder text
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderUrl = (
  width = 400,
  height = 300,
  text = "No Image"
) => {
  return `https://via.placeholder.com/${width}x${height}/e5e7eb/6b7280?text=${encodeURIComponent(
    text
  )}`;
};

/**
 * Check if an image URL is from Cloudinary
 * @param {string} imageUrl - Image URL to check
 * @returns {boolean} True if Cloudinary URL
 */
export const isCloudinaryUrl = (imageUrl) => {
  return imageUrl && imageUrl.includes("cloudinary.com");
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} cloudinaryUrl - Cloudinary URL
 * @returns {string|null} Public ID or null
 */
export const getCloudinaryPublicId = (cloudinaryUrl) => {
  if (!isCloudinaryUrl(cloudinaryUrl)) return null;

  const matches = cloudinaryUrl.match(/\/v\d+\/(.+)\./);
  return matches ? matches[1] : null;
};

/**
 * Image URL utilities for different components
 */
export const ImageUtils = {
  gallery: {
    full: (imageUrl) => getImageUrl(imageUrl),
    thumbnail: (imageUrl) => getThumbnailUrl(imageUrl, 400, 300),
    grid: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, { width: 300, height: 200, crop: "fill" }),
  },

  faculty: {
    profile: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, {
        width: 400,
        height: 400,
        crop: "fill",
        gravity: "face",
      }),
    avatar: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, {
        width: 100,
        height: 100,
        crop: "fill",
        gravity: "face",
      }),
    card: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, {
        width: 250,
        height: 300,
        crop: "fill",
        gravity: "face",
      }),
  },

  news: {
    hero: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, {
        width: 1200,
        height: 600,
        crop: "fill",
      }),
    card: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, { width: 400, height: 250, crop: "fill" }),
    thumbnail: (imageUrl) => getThumbnailUrl(imageUrl, 200, 150),
  },

  activities: {
    carousel: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, {
        width: 1600,
        height: 900,
        crop: "fill",
      }),
    grid: (imageUrl) =>
      getOptimizedImageUrl(imageUrl, { width: 400, height: 250, crop: "fill" }),
    preview: (imageUrl) => getThumbnailUrl(imageUrl, 300, 200),
  },
};

export default {
  getImageUrl,
  getThumbnailUrl,
  getResponsiveImageUrl,
  getOptimizedImageUrl,
  getPlaceholderUrl,
  isCloudinaryUrl,
  getCloudinaryPublicId,
  ImageUtils,
};
