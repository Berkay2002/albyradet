const fs = require('fs');
const path = require('path');

/**
 * Script to rename temp_P files to P files (temp_P1.webp -> P1.webp)
 * This finalizes the rotation process
 */

const PORTRAIT_FOLDER = path.join(__dirname, '..', 'public', 'converted', 'albytorget-juni-2025', 'Portrait');

function renameTempFiles() {
  try {
    console.log('🔄 Starting to rename temp_P files to P files...');
    console.log(`📁 Portrait folder: ${PORTRAIT_FOLDER}`);

    // Check if portrait folder exists
    if (!fs.existsSync(PORTRAIT_FOLDER)) {
      console.error(`❌ Portrait folder not found: ${PORTRAIT_FOLDER}`);
      return;
    }

    // Get all temp_P*.webp files in the portrait folder
    const files = fs.readdirSync(PORTRAIT_FOLDER)
      .filter(file => file.startsWith('temp_P') && file.toLowerCase().endsWith('.webp'))
      .sort((a, b) => {
        // Sort by number (temp_P1.webp, temp_P2.webp, etc.)
        const aNum = parseInt(a.match(/temp_P(\d+)/)?.[1] || '0');
        const bNum = parseInt(b.match(/temp_P(\d+)/)?.[1] || '0');
        return aNum - bNum;
      });

    console.log(`📷 Found ${files.length} temp_P files to rename`);

    if (files.length === 0) {
      console.log('ℹ️  No temp_P*.webp files found in the Portrait folder');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const filename of files) {
      try {
        const oldPath = path.join(PORTRAIT_FOLDER, filename);
        
        // Extract the number from temp_P1.webp -> P1.webp
        const match = filename.match(/temp_P(\d+)\.webp/);
        if (!match) {
          console.log(`⏭️  Skipping ${filename} (invalid format)`);
          continue;
        }
        
        const number = match[1];
        const newFilename = `P${number}.webp`;
        const newPath = path.join(PORTRAIT_FOLDER, newFilename);

        // Check if target file already exists
        if (fs.existsSync(newPath)) {
          console.log(`⚠️  Target file ${newFilename} already exists, backing up as ${newFilename}.old`);
          const backupPath = path.join(PORTRAIT_FOLDER, `${newFilename}.old`);
          fs.renameSync(newPath, backupPath);
        }

        console.log(`🔄 Renaming ${filename} -> ${newFilename}`);
        fs.renameSync(oldPath, newPath);

        console.log(`✅ Renamed ${filename} to ${newFilename}`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error renaming ${filename}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Rename Summary:');
    console.log(`✅ Successfully renamed: ${successCount} files`);
    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} files`);
    }
    console.log('\n🎉 File renaming complete!');

    if (successCount > 0) {
      console.log('\n💡 Next steps:');
      console.log('1. Update media-utils.ts to use P1.webp, P2.webp, etc. (instead of temp_P)');
      console.log('2. The rotated images are now properly named');
      console.log('3. No CSS rotation needed in the component');
    }

  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log('Temp File Rename Script\n');
  console.log('Usage:');
  console.log('  node rename-temp-files.js        # Rename all temp_P files to P files');
  console.log('  node rename-temp-files.js --help # Show this help message');
} else {
  renameTempFiles();
}
