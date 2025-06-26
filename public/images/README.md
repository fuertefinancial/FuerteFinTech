# Image Assets

This directory should contain the following image files:

## Hero Section Images:
- `hero-poster.jpg` - Poster image for video (first frame)
- `hero-fallback.jpg` - Static fallback image if video fails

## Image Specifications:
- **Format**: JPEG for photos, PNG for graphics with transparency
- **Resolution**: 
  - Desktop: 1920x1080
  - Mobile: 1080x1920 (portrait)
- **Quality**: 85% JPEG quality for good balance
- **File Size**: Keep under 200KB per image

## Optimization:
1. Use responsive images with srcset
2. Compress with tools like TinyPNG
3. Consider WebP format for modern browsers
4. Lazy load non-critical images 