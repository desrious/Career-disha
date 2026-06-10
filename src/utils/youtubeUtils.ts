/**
 * YouTube URL utility functions for extracting video IDs and converting to URLs
 * Maintains backward compatibility by storing only video IDs internally
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID&t=10s
 * 
 * @param input - YouTube URL or video ID
 * @returns Extracted video ID or null if invalid
 */
export function extractYouTubeVideoId(input: string): string | null {
  if (!input || typeof input !== 'string') {
    return null;
  }

  const trimmed = input.trim();

  // If it's already a video ID (11 characters, alphanumeric, -, _)
  // YouTube video IDs are typically 11 characters
  const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  if (videoIdRegex.test(trimmed)) {
    return trimmed;
  }

  // Try to extract from various URL formats
  const patterns = [
    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    // Short URL: https://youtu.be/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // Shortened embed: https://youtube.com/embed/VIDEO_ID
    /(?:https?:\/\/)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // v URL: https://www.youtube.com/v/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Convert YouTube video ID to full URL for display
 * 
 * @param videoId - YouTube video ID
 * @returns Full YouTube watch URL
 */
export function videoIdToUrl(videoId: string): string {
  if (!videoId) {
    return '';
  }
  const trimmed = videoId.trim();
  // If it's already a URL, return as-is
  if (trimmed.startsWith('http')) {
    return trimmed;
  }
  return `https://www.youtube.com/watch?v=${trimmed}`;
}

/**
 * Validate YouTube URL or video ID
 * 
 * @param input - YouTube URL or video ID
 * @returns true if valid, false otherwise
 */
export function isValidYouTubeInput(input: string): boolean {
  return extractYouTubeVideoId(input) !== null;
}
