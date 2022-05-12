import React from 'react';
import styles from '../../../styles/Tag.module.css';

interface TagProp {
  label: string;
}

const Tag = ({ label }: TagProp) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}> {label}</span>
    </div>
  );
};

export default Tag;
