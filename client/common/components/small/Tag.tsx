import React from 'react';
import styles from '../../../styles/Tag.module.css';

interface TagProp {
  label: string;
}

const Tag = ({ label }: TagProp) => {
  function generateRandomColor() {
    let colorArray = ['#e63946', '#428959', '#f18f01'];

    //code snippet from https://www.geeksforgeeks.org/how-to-pick-a-random-color-from-an-array-using-css-and-javascript/
    let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

    return randomColor;
  }
  return (
    <div className={styles.container}>
      <span className={styles.label}> {label}</span>
    </div>
  );
};

export default Tag;
