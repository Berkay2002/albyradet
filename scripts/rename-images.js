const fs = require('fs');
const path = require('path');

/**
 * Script to rename images in Portrait and Landscape folders
 * Portrait: P1.webp, P2.webp, P3.webp...
 * Landscape: L1.webp, L2.webp, L3.webp...
 */

const projectRoot = path.join(__dirname, '..');
const portraitDir = path.join(projectRoot, 'public', 'converted', 'albytorget-juni-2025', 'Portrait');
const landscapeDir = path.join(projectRoot, 'public', 'converted', 'albytorget-juni-2025', 'Landscape');

function renameImagesInFolder(folderPath, prefix) {
  console.log(`\n📁 Processing folder: ${folderPath}`);
  
  if (!fs.existsSync(folderPath)) {
    console.error(`❌ Folder does not exist: ${folderPath}`);
    return [];
  }

  // Get all .webp files and sort them by their original DSC number
  const files = fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.webp'))
    .sort((a, b) => {
      // Extract numbers from DSC00XXX.webp format
      const numA = parseInt(a.match(/DSC0*(\d+)\.webp/)?.[1] || '0');
      const numB = parseInt(b.match(/DSC0*(\d+)\.webp/)?.[1] || '0');
      return numA - numB;
    });

  console.log(`📋 Found ${files.length} images to rename`);

  const renamedFiles = [];
  
  files.forEach((file, index) => {
    const oldPath = path.join(folderPath, file);
    const newFileName = `${prefix}${index + 1}.webp`;
    const newPath = path.join(folderPath, newFileName);
    
    try {
      // Check if target file already exists
      if (fs.existsSync(newPath) && oldPath !== newPath) {
        console.log(`⚠️  Target already exists: ${newFileName} - skipping ${file}`);
        return;
      }
      
      // Rename the file
      fs.renameSync(oldPath, newPath);
      console.log(`✅ ${file} → ${newFileName}`);
      
      renamedFiles.push({
        old: file,
        new: newFileName,
        index: index + 1,
        prefix: prefix
      });
    } catch (error) {
      console.error(`❌ Error renaming ${file}:`, error.message);
    }
  });

  return renamedFiles;
}

function updateMediaUtilsFile(portraitFiles, landscapeFiles) {
  const mediaUtilsPath = path.join(projectRoot, 'lib', 'media-utils.ts');
  
  console.log(`\n📝 Updating ${mediaUtilsPath}...`);
  
  // Generate new functions with simple index-based arrays
  const portraitIndices = portraitFiles.map(f => f.index);
  const landscapeIndices = landscapeFiles.map(f => f.index);
  
  const newLandscapeFunction = `export function getAlbytorgetJuni2025LandscapeImages(): Array<{ type: 'image'; src: string; alt: string }> {
  // Landscape images: L1.webp to L${landscapeIndices.length}.webp
  const imageNumbers = [${landscapeIndices.join(', ')}];

  return imageNumbers.map(num => ({
    type: 'image' as const,
    src: \`/converted/albytorget-juni-2025/Landscape/L\${num}.webp\`,
    alt: \`Albytorget Juni 2025 - BotkyrkaChill event (Landscape) - Bild \${num}\`
  }));
}`;

  const newPortraitFunction = `export function getAlbytorgetJuni2025PortraitImages(): Array<{ type: 'image'; src: string; alt: string }> {
  // Portrait images: P1.webp to P${portraitIndices.length}.webp
  const imageNumbers = [${portraitIndices.join(', ')}];

  return imageNumbers.map(num => ({
    type: 'image' as const,
    src: \`/converted/albytorget-juni-2025/Portrait/P\${num}.webp\`,
    alt: \`Albytorget Juni 2025 - BotkyrkaChill event (Portrait) - Bild \${num}\`
  }));
}`;

  try {
    let content = fs.readFileSync(mediaUtilsPath, 'utf8');
    
    // Replace the landscape function
    content = content.replace(
      /export function getAlbytorgetJuni2025LandscapeImages\(\)[^}]+\{[^}]+\}/s,
      newLandscapeFunction
    );
    
    // Replace the portrait function
    content = content.replace(
      /export function getAlbytorgetJuni2025PortraitImages\(\)[^}]+\{[^}]+\}/s,
      newPortraitFunction
    );
    
    fs.writeFileSync(mediaUtilsPath, content);
    console.log('✅ Updated media-utils.ts with new file paths');
  } catch (error) {
    console.error('❌ Error updating media-utils.ts:', error.message);
  }
}

function main() {
  console.log('🚀 Starting image renaming process...');
  
  // Create backup info
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupInfo = {
    timestamp,
    portrait: [],
    landscape: []
  };
  
  // Rename portrait images (P1, P2, P3...)
  console.log('\n🎨 Renaming Portrait images...');
  const portraitFiles = renameImagesInFolder(portraitDir, 'P');
  backupInfo.portrait = portraitFiles;
  
  // Rename landscape images (L1, L2, L3...)
  console.log('\n🌄 Renaming Landscape images...');
  const landscapeFiles = renameImagesInFolder(landscapeDir, 'L');
  backupInfo.landscape = landscapeFiles;
  
  // Save backup info
  const backupPath = path.join(__dirname, `rename-backup-${timestamp}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(backupInfo, null, 2));
  console.log(`\n💾 Backup info saved to: ${backupPath}`);
  
  // Update media-utils.ts
  updateMediaUtilsFile(portraitFiles, landscapeFiles);
  
  console.log('\n🎉 Image renaming completed!');
  console.log(`📊 Summary:`);
  console.log(`   Portrait: ${portraitFiles.length} images (P1-P${portraitFiles.length})`);
  console.log(`   Landscape: ${landscapeFiles.length} images (L1-L${landscapeFiles.length})`);
  console.log(`\n💡 The media-utils.ts file has been updated automatically.`);
  console.log(`   You can now use simple indices in your code!`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { renameImagesInFolder, updateMediaUtilsFile };
