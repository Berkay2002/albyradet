const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Script to rotate all images in the Portrait folder by 90 degrees counterclockwise
 * This converts landscape images to proper portrait orientation
 */

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const PORTRAIT_FOLDER = path.join(__dirname, '..', 'public', 'converted', 'albytorget-juni-2025', 'Portrait');
const BACKUP_FOLDER = path.join(PORTRAIT_FOLDER, 'backup-original');

async function rotatePortraitImages() {
  try {
    console.log('🔄 Starting portrait image rotation...');
    console.log(`📁 Portrait folder: ${PORTRAIT_FOLDER}`);

    // Check if portrait folder exists
    if (!fs.existsSync(PORTRAIT_FOLDER)) {
      console.error(`❌ Portrait folder not found: ${PORTRAIT_FOLDER}`);
      return;
    }

    // Create backup folder if it doesn't exist
    if (!fs.existsSync(BACKUP_FOLDER)) {
      fs.mkdirSync(BACKUP_FOLDER, { recursive: true });
      console.log(`📁 Created backup folder: ${BACKUP_FOLDER}`);
    }

    // Get all .webp files in the portrait folder
    const files = fs.readdirSync(PORTRAIT_FOLDER)
      .filter(file => file.toLowerCase().endsWith('.webp') && !file.startsWith('.'))
      .sort((a, b) => {
        // Sort by number (P1.webp, P2.webp, etc.)
        const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });

    console.log(`📷 Found ${files.length} images to rotate`);

    if (files.length === 0) {
      console.log('ℹ️  No .webp images found in the Portrait folder');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const filename of files) {      try {
        const originalPath = path.join(PORTRAIT_FOLDER, filename);
        const backupPath = path.join(BACKUP_FOLDER, filename);

        // Check if backup already exists (skip if already processed)
        if (fs.existsSync(backupPath)) {
          console.log(`⏭️  Skipping ${filename} (backup already exists)`);
          continue;
        }console.log(`🔄 Processing ${filename}...`);

        // Copy original to backup folder
        fs.copyFileSync(originalPath, backupPath);

        // Create a unique temporary filename to avoid conflicts
        const timestamp = Date.now();
        const tempPath = path.join(PORTRAIT_FOLDER, `rotated_${timestamp}_${filename}`);

        // Rotate the image 90 degrees counterclockwise (-90 degrees)
        // This converts landscape images to portrait orientation
        await sharp(originalPath)
          .rotate(-90) // Rotate counterclockwise to convert landscape to portrait
          .webp({ quality: 90 }) // Maintain high quality
          .toFile(tempPath);        // Wait a bit for file system to release handles
        await delay(100);

        // Delete original file first, then rename temp file
        try {
          fs.unlinkSync(originalPath);
          await delay(50);
          fs.renameSync(tempPath, originalPath);
        } catch (renameError) {
          // If rename fails, try copy and delete approach
          console.log(`   Retrying with copy approach for ${filename}...`);
          fs.copyFileSync(tempPath, originalPath);
          fs.unlinkSync(tempPath);
        }

        console.log(`✅ Rotated ${filename}`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Rotation Summary:');
    console.log(`✅ Successfully rotated: ${successCount} images`);
    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} images`);
    }
    console.log(`💾 Original images backed up to: ${BACKUP_FOLDER}`);
    console.log('\n🎉 Portrait image rotation complete!');

    if (successCount > 0) {
      console.log('\n💡 Next steps:');
      console.log('1. Update your code to remove the -rotate-90 CSS class');
      console.log('2. The images are now physically rotated to portrait orientation');
      console.log('3. You can use object-cover or object-fill as needed');
    }

  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Function to restore original images from backup
async function restoreOriginalImages() {
  try {
    console.log('🔄 Restoring original images from backup...');

    if (!fs.existsSync(BACKUP_FOLDER)) {
      console.error('❌ No backup folder found. Cannot restore original images.');
      return;
    }

    const backupFiles = fs.readdirSync(BACKUP_FOLDER)
      .filter(file => file.toLowerCase().endsWith('.webp'));

    for (const filename of backupFiles) {
      const backupPath = path.join(BACKUP_FOLDER, filename);
      const originalPath = path.join(PORTRAIT_FOLDER, filename);
      
      fs.copyFileSync(backupPath, originalPath);
      console.log(`✅ Restored ${filename}`);
    }

    console.log(`🎉 Restored ${backupFiles.length} images from backup`);
  } catch (error) {
    console.error('❌ Restore failed:', error.message);
  }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--restore')) {
  restoreOriginalImages();
} else if (args.includes('--help')) {
  console.log('Portrait Image Rotation Script\n');
  console.log('Usage:');
  console.log('  node rotate-portrait-images.js        # Rotate all portrait images');
  console.log('  node rotate-portrait-images.js --restore   # Restore original images from backup');
  console.log('  node rotate-portrait-images.js --help      # Show this help message');
} else {
  rotatePortraitImages();
}
