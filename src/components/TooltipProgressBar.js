// ProgressBar.js
import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ blogPoint, color }) => {
  const steps = Array.from({ length: 9 }, (_, index) => index + 1);

  return (
    <div className={styles.progressBar}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.progressBarStep} ${index < blogPoint ? styles.filled : ''}`}
          style={{ backgroundColor: index < blogPoint ? color : '#e0e0df' }}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
