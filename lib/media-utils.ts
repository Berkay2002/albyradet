/**
 * Utility functions for generating media arrays for projects
 */

/**
 * Generate media items from a directory of images
 * @param basePath - The base path to the image directory
 * @param imageCount - Number of images (assumes sequential naming like DSC00191.JPG -> DSC00348.JPG)
 * @param startNumber - Starting number for sequential images
 * @param format - File format (.webp, .jpg, etc.)
 * @param altTextPrefix - Prefix for alt text
 */
export function generateImageMediaItems(
  basePath: string,
  imageNumbers: number[],
  format: string = '.webp',
  altTextPrefix: string = 'Bild från projektet'
): Array<{ type: 'image'; src: string; alt: string }> {
  return imageNumbers.map(num => ({
    type: 'image' as const,
    src: `${basePath}/DSC${num.toString().padStart(5, '0')}${format}`,
    alt: `${altTextPrefix} - Bild ${num}`
  }));
}

/**
 * Generate all Albytorget Juni 2025 landscape images
 */
export function getAlbytorgetJuni2025LandscapeImages(): Array<{ type: 'image'; src: string; alt: string; rotation: number }> {
  // Landscape images: L1.webp to L14.webp
  const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return imageNumbers.map(num => ({
    type: 'image' as const,
    src: `/converted/albytorget-juni-2025/Landscape/L${num}.webp`,
    alt: `Albytorget Juni 2025 - BotkyrkaChill event (Landscape) - Bild ${num}`,
    rotation: 0 // Landscape photos display normally
  }));
}

/**
 * Generate all Albytorget Juni 2025 portrait images
 * These are now properly rotated images (P1.webp, P2.webp, etc.)
 */
export function getAlbytorgetJuni2025PortraitImages(): Array<{ type: 'image'; src: string; alt: string; rotation: number }> {
  // Portrait images: P1.webp to P35.webp (these are now properly rotated)
  const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

  return imageNumbers.map(num => ({
    type: 'image' as const,
    src: `/converted/albytorget-juni-2025/Portrait/P${num}.webp`,
    alt: `Albytorget Juni 2025 - BotkyrkaChill event (Portrait) - Bild ${num}`,
    rotation: 0 // These are now physically rotated, no CSS rotation needed
  }));
}

/**
 * Get all Albytorget images (both landscape and portrait)
 * Returns an object with both orientations for CSS-based responsive display
 */
export function getAllAlbytorgetImages() {
  return {
    landscape: getAlbytorgetJuni2025LandscapeImages(),
    portrait: getAlbytorgetJuni2025PortraitImages()
  };
}

/**
 * Get BotkyrkaChill media with responsive Albytorget images
 * Returns portrait images for mobile, landscape images for desktop
 */
export function getCombinedBotkyrkachillMedia() {
  const portraitImages = getAlbytorgetJuni2025PortraitImages();
  const landscapeImages = getAlbytorgetJuni2025LandscapeImages();
  
  // Return portrait images marked for mobile display
  const mobileImages = portraitImages.map(img => ({
    ...img,
    deviceType: 'mobile' as const
  }));
  
  // Return landscape images marked for desktop display  
  const desktopImages = landscapeImages.map(img => ({
    ...img,
    deviceType: 'desktop' as const
  }));
  
  // Combine both sets - CSS will show appropriate ones
  return [...mobileImages, ...desktopImages];
}

/**
 * @deprecated Use getCombinedBotkyrkachillMedia() instead
 */
export function getResponsiveAlbytorgetImages(isMobile: boolean = false) {
  return isMobile ? getAlbytorgetJuni2025PortraitImages() : getAlbytorgetJuni2025LandscapeImages();
}
