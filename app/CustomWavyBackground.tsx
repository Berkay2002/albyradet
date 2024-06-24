// app/CustomWavyBackground.tsx
import React from 'react';
import styles from './CustomWavyBackground.module.css';

const CustomWavyBackground = () => {
  return (
    <div className={styles.wavyBackground}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,128L80,154.7C160,181,320,235,480,245.3C640,256,800,224,960,218.7C1120,213,1280,235,1360,245.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default CustomWavyBackground;

