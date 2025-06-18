const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  inputDir: './public/converted/albytorget-juni-2025', // Directory to analyze
  outputDir: './public/converted/albytorget-juni-2025-sorted', // Directory for sorted images
  landscapeDir: 'landscape', // Subdirectory for landscape images
  portraitDir: 'portrait', // Subdirectory for portrait images
  squareDir: 'square', // Subdirectory for square images
  dryRun: false, // Set to true to see what would be done without actually moving files
  createSeparateFolders: true, // Create separate folders by orientation
  addPrefixInstead: false // Alternative: add prefix to filename instead of folders
};

/**
 * Analyze image orientation
 */
async function analyzeImageOrientation(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    const { width, height } = metadata;
    
    if (!width || !height) {
      throw new Error('Could not read image dimensions');
    }
    
    const ratio = width / height;
    
    // Determine orientation
    let orientation;
    if (ratio > 1.2) {
      orientation = 'landscape';
    } else if (ratio < 0.8) {
      orientation = 'portrait';
    } else {
      orientation = 'square'; // or nearly square
    }
    
    return {
      width,
      height,
      ratio: ratio.toFixed(2),
      orientation,
      aspectRatio: `${width}x${height}`
    };
  } catch (error) {
    console.error(`❌ Error analyzing ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Get all image files from directory
 */
function getImageFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Directory does not exist: ${dir}`);
    return [];
  }
  
  const files = fs.readdirSync(dir);
  return files
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => path.join(dir, file));
}

/**
 * Create directories if they don't exist
 */
function ensureDirectories() {
  if (CONFIG.createSeparateFolders) {
    const dirs = [
      CONFIG.outputDir,
      path.join(CONFIG.outputDir, CONFIG.landscapeDir),
      path.join(CONFIG.outputDir, CONFIG.portraitDir),
      path.join(CONFIG.outputDir, CONFIG.squareDir)
    ];
    
    dirs.forEach(dir => {
      if (!CONFIG.dryRun && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });
  }
}

/**
 * Generate new file path based on orientation
 */
function getNewFilePath(originalPath, orientation) {
  const fileName = path.basename(originalPath);
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);
  
  if (CONFIG.createSeparateFolders) {
    const subDir = orientation === 'landscape' ? CONFIG.landscapeDir :
                   orientation === 'portrait' ? CONFIG.portraitDir :
                   CONFIG.squareDir;
    return path.join(CONFIG.outputDir, subDir, fileName);
  } else if (CONFIG.addPrefixInstead) {
    const prefix = orientation.charAt(0).toUpperCase(); // L, P, or S
    const newFileName = `${prefix}_${baseName}${ext}`;
    return path.join(CONFIG.outputDir, newFileName);
  } else {
    return path.join(CONFIG.outputDir, fileName);
  }
}

/**
 * Move or copy file to new location
 */
function moveFile(fromPath, toPath, operation = 'copy') {
  try {
    if (CONFIG.dryRun) {
      console.log(`🔍 Would ${operation}: ${fromPath} → ${toPath}`);
      return true;
    }
    
    if (operation === 'copy') {
      fs.copyFileSync(fromPath, toPath);
    } else {
      fs.renameSync(fromPath, toPath);
    }
    
    console.log(`✅ ${operation === 'copy' ? 'Copied' : 'Moved'}: ${path.basename(fromPath)} → ${toPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to ${operation} ${fromPath}:`, error.message);
    return false;
  }
}

/**
 * Main function to analyze and sort images
 */
async function sortImagesByOrientation() {
  console.log('🔍 Starting image orientation analysis...');
  console.log(`📁 Input directory: ${CONFIG.inputDir}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  console.log(`⚙️  Dry run: ${CONFIG.dryRun ? 'YES (no files will be moved)' : 'NO'}`);
  console.log(`📂 Create folders: ${CONFIG.createSeparateFolders ? 'YES' : 'NO'}`);
  console.log('');
  
  // Get all image files
  const imageFiles = getImageFiles(CONFIG.inputDir);
  
  if (imageFiles.length === 0) {
    console.log('❌ No image files found to analyze.');
    return;
  }
  
  console.log(`📸 Found ${imageFiles.length} images to analyze`);
  console.log('');
  
  // Create output directories
  ensureDirectories();
  
  // Analyze each image
  const results = {
    landscape: [],
    portrait: [],
    square: [],
    errors: []
  };
  
  for (let i = 0; i < imageFiles.length; i++) {
    const imagePath = imageFiles[i];
    const fileName = path.basename(imagePath);
    
    console.log(`[${i + 1}/${imageFiles.length}] Analyzing ${fileName}...`);
    
    const analysis = await analyzeImageOrientation(imagePath);
    
    if (analysis) {
      const { width, height, ratio, orientation, aspectRatio } = analysis;
      console.log(`   📐 ${aspectRatio} (ratio: ${ratio}) → ${orientation.toUpperCase()}`);
      
      // Move file to appropriate location
      const newPath = getNewFilePath(imagePath, orientation);
      const success = moveFile(imagePath, newPath, 'copy');
      
      if (success) {
        results[orientation].push({
          original: fileName,
          new: newPath,
          dimensions: aspectRatio,
          ratio: parseFloat(ratio)
        });
      } else {
        results.errors.push(fileName);
      }
    } else {
      results.errors.push(fileName);
    }
    
    console.log('');
  }
  
  // Summary
  console.log('📊 ANALYSIS SUMMARY');
  console.log('='.repeat(50));
  console.log(`🖼️  Landscape images: ${results.landscape.length}`);
  console.log(`📱 Portrait images: ${results.portrait.length}`);
  console.log(`⬜ Square images: ${results.square.length}`);
  console.log(`❌ Errors: ${results.errors.length}`);
  console.log('');
  
  // Detailed breakdown
  if (results.landscape.length > 0) {
    console.log('🖼️  LANDSCAPE IMAGES:');
    results.landscape.forEach(img => {
      console.log(`   ${img.original} (${img.dimensions}, ratio: ${img.ratio})`);
    });
    console.log('');
  }
  
  if (results.portrait.length > 0) {
    console.log('📱 PORTRAIT IMAGES:');
    results.portrait.forEach(img => {
      console.log(`   ${img.original} (${img.dimensions}, ratio: ${img.ratio})`);
    });
    console.log('');
  }
  
  if (results.square.length > 0) {
    console.log('⬜ SQUARE IMAGES:');
    results.square.forEach(img => {
      console.log(`   ${img.original} (${img.dimensions}, ratio: ${img.ratio})`);
    });
    console.log('');
  }
  
  if (results.errors.length > 0) {
    console.log('❌ ERRORS:');
    results.errors.forEach(file => {
      console.log(`   ${file}`);
    });
    console.log('');
  }
  
  // Generate updated media utils code
  if (!CONFIG.dryRun && CONFIG.createSeparateFolders) {
    generateUpdatedMediaUtils(results);
  }
  
  console.log('🎉 Analysis complete!');
  
  if (CONFIG.dryRun) {
    console.log('\n💡 This was a dry run. To actually move files, set dryRun: false in the config.');
  }
}

/**
 * Generate updated media-utils.ts code
 */
function generateUpdatedMediaUtils(results) {
  const landscapeImages = results.landscape.map(img => {
    const fileName = path.basename(img.original, path.extname(img.original));
    const match = fileName.match(/DSC(\d+)/);
    return match ? parseInt(match[1]) : null;
  }).filter(num => num !== null);
  
  const portraitImages = results.portrait.map(img => {
    const fileName = path.basename(img.original, path.extname(img.original));
    const match = fileName.match(/DSC(\d+)/);
    return match ? parseInt(match[1]) : null;
  }).filter(num => num !== null);
  
  const squareImages = results.square.map(img => {
    const fileName = path.basename(img.original, path.extname(img.original));
    const match = fileName.match(/DSC(\d+)/);
    return match ? parseInt(match[1]) : null;
  }).filter(num => num !== null);
  
  const updatedCode = `
// Updated media-utils.ts with orientation-sorted images

export function getAlbytorgetJuni2025LandscapeImages() {
  const imageNumbers = [${landscapeImages.join(', ')}];
  return generateImageMediaItems(
    '/converted/albytorget-juni-2025-sorted/landscape',
    imageNumbers,
    '.webp',
    'Albytorget Juni 2025 - Landscape'
  );
}

export function getAlbytorgetJuni2025PortraitImages() {
  const imageNumbers = [${portraitImages.join(', ')}];
  return generateImageMediaItems(
    '/converted/albytorget-juni-2025-sorted/portrait',
    imageNumbers,
    '.webp',
    'Albytorget Juni 2025 - Portrait'
  );
}

export function getAlbytorgetJuni2025SquareImages() {
  const imageNumbers = [${squareImages.join(', ')}];
  return generateImageMediaItems(
    '/converted/albytorget-juni-2025-sorted/square',
    imageNumbers,
    '.webp',
    'Albytorget Juni 2025 - Square'
  );
}
`;
  
  console.log('📝 Generated updated media-utils.ts code:');
  console.log(updatedCode);
}

// CLI argument parsing
function parseArguments() {
  const args = process.argv.slice(2);
  
  args.forEach(arg => {
    if (arg.startsWith('--input=')) {
      CONFIG.inputDir = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      CONFIG.outputDir = arg.split('=')[1];
    } else if (arg === '--dry-run') {
      CONFIG.dryRun = true;
    } else if (arg === '--move') {
      CONFIG.operation = 'move';
    } else if (arg === '--prefix') {
      CONFIG.addPrefixInstead = true;
      CONFIG.createSeparateFolders = false;
    }
  });
}

// Help function
function showHelp() {
  console.log(`
📐 Image Orientation Analyzer and Sorter

Usage: node scripts/image-orientation-sorter.js [options]

Options:
  --input=<path>     Input directory (default: ./public/converted/albytorget-juni-2025)
  --output=<path>    Output directory (default: ./public/converted/albytorget-juni-2025-sorted)
  --dry-run          Analyze only, don't move files
  --move             Move files instead of copying
  --prefix           Add orientation prefix to filenames instead of folders
  --help             Show this help

Examples:
  node scripts/image-orientation-sorter.js --dry-run
  node scripts/image-orientation-sorter.js --input=./public/photos
  node scripts/image-orientation-sorter.js --prefix --output=./public/sorted
`);
}

// Main execution
if (require.main === module) {
  if (process.argv.includes('--help')) {
    showHelp();
    process.exit(0);
  }
  
  parseArguments();
  sortImagesByOrientation().catch(console.error);
}

module.exports = { sortImagesByOrientation, analyzeImageOrientation };
