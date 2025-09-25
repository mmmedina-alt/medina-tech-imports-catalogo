/**
 * Utilities for handling media files (images, videos) in the catalog
 */

// Supported video formats
export const VIDEO_EXTENSIONS = [
    '.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'
];

// Supported image formats
export const IMAGE_EXTENSIONS = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif', '.bmp'
];

/**
 * Enhanced video detection function that supports multiple formats and query params
 * @param url - The media URL to check
 * @returns true if the URL is a video file
 */
export const isVideo = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Extract the actual filename by removing query params and getting the last part of the path
    const urlWithoutQuery = url.split('?')[0];
    const filename = urlWithoutQuery.toLowerCase();
    
    // Check if the URL ends with any video extensions (more precise than includes)
    return VIDEO_EXTENSIONS.some(ext => 
        filename.endsWith(ext) || filename.includes(ext + '.')
    );
};

/**
 * Check if a URL is an image file
 * @param url - The media URL to check
 * @returns true if the URL is an image file
 */
export const isImage = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Extract the actual filename by removing query params
    const urlWithoutQuery = url.split('?')[0];
    const filename = urlWithoutQuery.toLowerCase();
    
    // Check if the URL contains any image extensions
    return IMAGE_EXTENSIONS.some(ext => filename.includes(ext));
};

/**
 * Get the media type of a URL
 * @param url - The media URL to check
 * @returns 'video', 'image', or 'unknown'
 */
export const getMediaType = (url: string): 'video' | 'image' | 'unknown' => {
    if (isVideo(url)) return 'video';
    if (isImage(url)) return 'image';
    return 'unknown';
};

/**
 * Validate if a URL is a supported media file
 * @param url - The media URL to check
 * @returns true if the URL is a supported media file
 */
export const isSupportedMediaFile = (url: string): boolean => {
    return isVideo(url) || isImage(url);
};

/**
 * Get appropriate HTML element props for a media file
 * @param url - The media URL
 * @returns object with element type and common props
 */
export const getMediaElementProps = (url: string) => {
    const type = getMediaType(url);
    
    if (type === 'video') {
        return {
            element: 'video' as const,
            src: url,
            controls: true,
            preload: 'metadata' as const,
            'aria-label': 'Vídeo do produto'
        };
    }
    
    if (type === 'image') {
        return {
            element: 'img' as const,
            src: url,
            alt: 'Imagem do produto',
            loading: 'lazy' as const
        };
    }
    
    return {
        element: 'div' as const,
        'data-unsupported-media': url
    };
};