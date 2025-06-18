const fs = require('fs');
const path = require('path');

// Import the media utils (this is a simplified version for Node.js)
const generateImageMediaItems = (basePath, imageNumbers, format, altTextPrefix) => {
  return imageNumbers.map(num => ({
    type: 'image',
    src: `${basePath}/DSC${num.toString().padStart(5, '0')}${format}`,
    alt: `${altTextPrefix} - Bild ${num}`
  }));
};

const getAlbytorgetJuni2025LandscapeImages = () => {
  const imageNumbers = [
    195, 201, 202, 212, 217, 219, 269, 280, 281, 288, 308, 313, 315, 320, 328, 348
  ];

  return generateImageMediaItems(
    '/converted/albytorget-juni-2025/Landscape',
    imageNumbers,
    '.webp',
    'Albytorget Juni 2025 - BotkyrkaChill event (Landscape)'
  );
};

const getAlbytorgetJuni2025PortraitImages = () => {
  const imageNumbers = [
    191, 193, 194, 196, 198, 199, 200, 203, 204, 205, 206, 207, 208, 211, 213, 214, 
    215, 216, 218, 220, 223, 226, 227, 228, 229, 230, 239, 256, 257, 263, 271, 284, 
    287, 292, 293, 296, 297, 298, 302, 303, 304, 305, 307, 318, 341
  ];

  return generateImageMediaItems(
    '/converted/albytorget-juni-2025/Portrait',
    imageNumbers,
    '.webp',
    'Albytorget Juni 2025 - BotkyrkaChill event (Portrait)'
  );
};

const getCombinedBotkyrkachillMedia = (isMobile = false) => {
  const originalMedia = [
    { 
      type: 'image', 
      src: "/botkyrkachill/IMG_1027_2.jpg",
      alt: "Barn deltar i aktiviteter under BotkyrkaChill"
    },
    { 
      type: 'image', 
      src: "/botkyrkachill/johannes_sockervadd.jpg",
      alt: "Johannes visar hur man gör sockervadd"
    },
    { 
      type: 'video', 
      src: "/botkyrkachill/IMG_1001.MOV",
      alt: "Aktiviteter och stämning från BotkyrkaChill"
    },
    { 
      type: 'video', 
      src: "/botkyrkachill/vid.mp4",
      alt: "Sammanfattning av BotkyrkaChill evenemanget"
    },
  ];

  const newImages = isMobile ? getAlbytorgetJuni2025PortraitImages() : getAlbytorgetJuni2025LandscapeImages();

  const combinedMedia = [
    originalMedia[0],
    ...newImages.slice(0, Math.min(20, newImages.length)),
    originalMedia[1],
    ...newImages.slice(20, Math.min(60, newImages.length)),
    originalMedia[2],
    ...newImages.slice(60),
    originalMedia[3],
  ];

  return combinedMedia;
};

/**
 * Verify that all media files exist
 */
function verifyMediaFiles() {
  console.log('🔍 Verifying all media files exist...\n');
  
  const publicDir = './public';
  let allExist = true;
  let missingFiles = [];
  let existingFiles = [];

  // Test both desktop and mobile configurations
  console.log('📱 MOBILE CONFIGURATION (Portrait images):');
  const mobileMedia = getCombinedBotkyrkachillMedia(true);
  
  mobileMedia.forEach((item, index) => {
    const filePath = path.join(publicDir, item.src);
    const exists = fs.existsSync(filePath);
    
    if (exists) {
      existingFiles.push(item.src);
      console.log(`✅ [${index + 1}/${mobileMedia.length}] ${item.src}`);
    } else {
      missingFiles.push(item.src);
      allExist = false;
      console.log(`❌ [${index + 1}/${mobileMedia.length}] ${item.src} - FILE NOT FOUND`);
    }
  });

  console.log('\n💻 DESKTOP CONFIGURATION (Landscape images):');
  const desktopMedia = getCombinedBotkyrkachillMedia(false);
  
  desktopMedia.forEach((item, index) => {
    const filePath = path.join(publicDir, item.src);
    const exists = fs.existsSync(filePath);
    
    if (exists) {
      if (!existingFiles.includes(item.src)) {
        existingFiles.push(item.src);
      }
      console.log(`✅ [${index + 1}/${desktopMedia.length}] ${item.src}`);
    } else {
      if (!missingFiles.includes(item.src)) {
        missingFiles.push(item.src);
      }
      allExist = false;
      console.log(`❌ [${index + 1}/${desktopMedia.length}] ${item.src} - FILE NOT FOUND`);
    }
  });

  console.log('\n📊 SUMMARY:');
  console.log('='.repeat(50));
  console.log(`✅ Existing files: ${existingFiles.length}`);
  console.log(`❌ Missing files: ${missingFiles.length}`);
  console.log(`📱 Mobile media items: ${mobileMedia.length}`);
  console.log(`💻 Desktop media items: ${desktopMedia.length}`);

  if (missingFiles.length > 0) {
    console.log('\n❌ MISSING FILES:');
    missingFiles.forEach(file => {
      console.log(`   ${file}`);
    });
  }

  if (allExist) {
    console.log('\n🎉 All media files exist! Your carousel should work perfectly.');
  } else {
    console.log('\n⚠️  Some files are missing. Please check the paths above.');
  }

  return { allExist, missingFiles, existingFiles };
}

// Run verification
if (require.main === module) {
  verifyMediaFiles();
}

module.exports = { verifyMediaFiles };
