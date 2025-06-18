# Image to WebP Converter

This script converts JPEG and PNG images to WebP format with compression and resizing capabilities. Perfect for optimizing images for web use and reducing repository size.

## Features

- 🔄 Converts JPEG/PNG to WebP format
- 📦 Significantly reduces file sizes (typically 50-80% smaller)
- 📏 Automatically resizes large images
- 📁 Processes entire directory trees recursively
- ⏭️ Skips already converted files
- 📊 Shows detailed conversion statistics
- ⚙️ Highly configurable

## Quick Start

```bash
# Convert all images in ./public directory
npm run convert-images

# Or run directly
node scripts/image-converter.js
```

## Configuration Options

```bash
# Custom input/output directories
node scripts/image-converter.js --input=./public/photos --output=./public/webp

# Adjust quality (1-100, default: 80)
node scripts/image-converter.js --quality=70

# Set maximum dimensions (default: 1920x1080)
node scripts/image-converter.js --width=1200 --height=800

# Overwrite existing WebP files
node scripts/image-converter.js --overwrite

# Show help
node scripts/image-converter.js --help
```

## Default Settings

- **Input Directory**: `./public`
- **Output Directory**: `./public/converted`
- **Quality**: 80% (good balance of quality/size)
- **Max Dimensions**: 1920x1080px
- **Supported Formats**: .jpg, .jpeg, .png
- **Skip Existing**: Yes

## Example Output

```
🚀 Starting image conversion...
📁 Input directory: ./public
📁 Output directory: ./public/converted
⚙️  Quality: 80%
📏 Max dimensions: 1920x1080

📸 Found 105 images to process

[1/105] Processing...
✅ ar-innovation/image00003.jpeg
   📦 2.3MB → 456KB (80.2% reduction)

[2/105] Processing...
✅ botkyrkachill/IMG_1027_2.jpg
   📦 1.8MB → 324KB (82.0% reduction)

...

📊 SUMMARY
==================================================
✅ Converted: 105
⏭️  Skipped: 0
❌ Errors: 0
📦 Total size reduction: 89.4MB → 18.2MB
💾 Space saved: 71.2MB (79.6% reduction)

🎉 Conversion complete!
```

## Tips

1. **Start with default settings** - they work well for most cases
2. **Lower quality (60-70)** for even smaller files if quality is less critical
3. **Use --overwrite** if you want to reconvert with different settings
4. **Check output directory** before committing to git
5. **Keep originals** - the converter creates new files, doesn't replace originals

## File Structure After Conversion

```
public/
├── original-image.jpg        # Original file (unchanged)
└── converted/
    └── original-image.webp   # Converted WebP file
```

This preserves your original files while creating optimized versions for web use.
