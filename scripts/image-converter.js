const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  inputDir: './public', // Directory to scan for images
  outputDir: './public/converted', // Directory to save converted images
  quality: 80, // WebP quality (1-100)
  maxWidth: 1920, // Maximum width for resizing
  maxHeight: 1080, // Maximum height for resizing
  extensions: ['.jpg', '.jpeg', '.png'], // Input formats to convert
  skipExisting: true // Skip if WebP already exists
};

/**
 * Get all image files recursively from a directory
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

/**
 * Convert a single image to WebP
 */
async function convertImage(inputPath) {
  try {
    const relativePath = path.relative(CONFIG.inputDir, inputPath);
    const outputPath = path.join(CONFIG.outputDir, relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Skip if WebP already exists and skipExisting is true
    if (CONFIG.skipExisting && fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${relativePath} (already exists)`);
      return { status: 'skipped', inputPath, outputPath };
    }
    
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    
    // Convert image
    await sharp(inputPath)
      .resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);
    
    // Get new file size
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const compressionRatio = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${relativePath}`);
    console.log(`   📦 ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${compressionRatio}% reduction)`);
    
    return {
      status: 'converted',
      inputPath,
      outputPath,
      originalSize,
      newSize,
      compressionRatio: parseFloat(compressionRatio)
    };
    
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    return { status: 'error', inputPath, error: error.message };
  }
}

/**
 * Main function to convert all images
 */
async function convertAllImages() {
  console.log('🚀 Starting image conversion...');
  console.log(`📁 Input directory: ${CONFIG.inputDir}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  console.log(`⚙️  Quality: ${CONFIG.quality}%`);
  console.log(`📏 Max dimensions: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
  console.log('');
  
  // Get all image files
  const imageFiles = getImageFiles(CONFIG.inputDir);
  console.log(`📸 Found ${imageFiles.length} images to process`);
  console.log('');
  
  if (imageFiles.length === 0) {
    console.log('No images found to convert.');
    return;
  }
  
  // Convert images
  const results = [];
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  
  for (let i = 0; i < imageFiles.length; i++) {
    const imagePath = imageFiles[i];
    console.log(`[${i + 1}/${imageFiles.length}] Processing...`);
    
    const result = await convertImage(imagePath);
    results.push(result);
    
    if (result.status === 'converted') {
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
    }
    
    console.log('');
  }
  
  // Summary
  const converted = results.filter(r => r.status === 'converted');
  const skipped = results.filter(r => r.status === 'skipped');
  const errors = results.filter(r => r.status === 'error');
  
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Converted: ${converted.length}`);
  console.log(`⏭️  Skipped: ${skipped.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  
  if (converted.length > 0) {
    const totalCompressionRatio = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100);
    console.log(`📦 Total size reduction: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB → ${(totalNewSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`💾 Space saved: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(1)}MB (${totalCompressionRatio.toFixed(1)}% reduction)`);
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(error => {
      console.log(`   ${error.inputPath}: ${error.error}`);
    });
  }
  
  console.log('\n🎉 Conversion complete!');
}

// CLI argument parsing
function parseArguments() {
  const args = process.argv.slice(2);
  
  args.forEach(arg => {
    if (arg.startsWith('--input=')) {
      CONFIG.inputDir = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      CONFIG.outputDir = arg.split('=')[1];
    } else if (arg.startsWith('--quality=')) {
      CONFIG.quality = parseInt(arg.split('=')[1]);
    } else if (arg.startsWith('--width=')) {
      CONFIG.maxWidth = parseInt(arg.split('=')[1]);
    } else if (arg.startsWith('--height=')) {
      CONFIG.maxHeight = parseInt(arg.split('=')[1]);
    } else if (arg === '--overwrite') {
      CONFIG.skipExisting = false;
    }
  });
}

// Help function
function showHelp() {
  console.log(`
🖼️  Image to WebP Converter

Usage: node scripts/image-converter.js [options]

Options:
  --input=<path>     Input directory (default: ./public)
  --output=<path>    Output directory (default: ./public/converted)
  --quality=<1-100>  WebP quality (default: 80)
  --width=<pixels>   Max width (default: 1920)
  --height=<pixels>  Max height (default: 1080)
  --overwrite        Overwrite existing WebP files
  --help             Show this help

Examples:
  node scripts/image-converter.js
  node scripts/image-converter.js --quality=70 --width=1200
  node scripts/image-converter.js --input=./public/photos --output=./public/webp
`);
}

// Main execution
if (require.main === module) {
  if (process.argv.includes('--help')) {
    showHelp();
    process.exit(0);
  }
  
  parseArguments();
  convertAllImages().catch(console.error);
}

module.exports = { convertAllImages, convertImage, getImageFiles };
