# Video Assets for Mobile

This directory should contain the following video files for mobile hero fallback:

## Required Files:
- `fuerte-hero-mobile.mp4` - H.264 encoded video of the desktop WebGL animation
- `fuerte-hero-mobile.webm` - WebM format for better compression and quality

## Video Specifications:
- **Resolution**: 1080x1920 (9:16 portrait) and 1920x1080 (16:9 landscape)
- **Duration**: 10-15 seconds loop
- **Frame Rate**: 30fps
- **Bitrate**: 2-3 Mbps for balance of quality and performance
- **Content**: Capture of the desktop hero animation showing:
  - Red chaos particles
  - Blue crystalline engine
  - Transformation animation
  - Seamless loop point

## Optimization Tips:
1. Use two-pass encoding for better quality
2. Ensure smooth loop transition
3. Test on actual mobile devices
4. Keep file size under 5MB for fast loading

## Tools for Creation:
- OBS Studio for screen capture
- FFmpeg for encoding
- HandBrake for optimization 