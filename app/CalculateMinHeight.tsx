// CalculateMinHeight.tsx

import React from 'react';

/**
 * Function to calculate the minimum height among a list of images.
 * @param imageSrcs Array of image source paths (URLs).
 * @returns A Promise that resolves to the minimum height of the images.
 */
export const calculateMinHeight = (imageSrcs: string[]): Promise<number> => {
  return new Promise((resolve) => {
    let minHeight = Infinity;
    let loadedImages = 0;

    imageSrcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (img.height < minHeight) {
          minHeight = img.height;
        }
        loadedImages += 1;

        // Resolve the promise once all images have been loaded
        if (loadedImages === imageSrcs.length) {
          resolve(minHeight);
        }
      };
    });
  });
};

/**
 * Example of how to use the calculateMinHeight function in a React component.
 */
const ExampleComponent: React.FC = () => {
  const [minHeight, setMinHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const imageSources = [
      '/lovaktiviteter/lovaktiviteter1.png',
      '/lovaktiviteter/lovaktiviteter2.png',
      '/lovaktiviteter/lovaktiviteter3.png',
    ];

    calculateMinHeight(imageSources).then((minHeight) => {
      setMinHeight(minHeight);
    });
  }, []);

  return (
    <div style={{ minHeight: `${minHeight}px`, backgroundColor: 'lightgray' }}>
      <p>The minimum image height is: {minHeight}px</p>
    </div>
  );
};

export default ExampleComponent;
