import styles from '../../styles/Filter.module.css';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';
import { stat } from 'fs';
import CustomButton from './small/CustomButton';

const Filter = () => {
  //milestones
  const [showCollapsible, setShowCollapsible] = useState(false);
  const status: String[] = [
    'To Do',
    'In Progress',
    'Review',
    'Done',
    'Backlog',
  ];

  const priority: String[] = ['none', 'Low', 'Medium', 'High', 'Urgent'];

  const handleClick = (index) => {};
  return (
    <>
      <div
        className={styles.filter}
        onClick={() => setShowCollapsible(!showCollapsible)}
        style={
          showCollapsible
            ? {
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0',
              }
            : { borderRadius: '10px' }
        }
      >
        <p className={styles.label}>
          Filter by <MdKeyboardArrowDown className={styles.icon} />
        </p>
      </div>

      <div
        className={styles.collapsible}
        style={showCollapsible ? { display: 'flex' } : { display: 'none' }}
      >
        <div className={styles.column}>
          <p className={styles.section}>
            Status <MdKeyboardArrowDown className={styles.icon2} />
          </p>
          <div className={styles.select}>
            {status.map((label, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(index)}
                  className={styles.list}
                >
                  {label}
                </li>
              );
            })}
          </div>
        </div>
        <div className={styles.column}>
          <p className={styles.section}>
            Priority <MdKeyboardArrowDown className={styles.icon2} />
          </p>
          <div className={styles.select}>
            {priority.map((prt, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(index)}
                  className={styles.list}
                >
                  {prt}
                </li>
              );
            })}
          </div>
        </div>
        <div className={styles.filterButton}>
          <CustomButton
            button="Filter"
            color="#e63946"
            textColor="#fff"
            onClick={() => console.log('clicked')}
          />
        </div>
      </div>

      {/* 
      <select>
        {status.map((label, index) => {
          return <option key={index}>{label}</option>;
        })}
      </select>
      <select>
        {priority.map((priort, index) => {
          return <option key={index}>{priort}</option>;
        })}
      </select>
      <select>
        {milestones.map((priort, index) => {
          return <option key={index}>{priort}</option>;
        })}
      </select>
      <select>
        {priority.map((priort, index) => {
          return <option key={index}>{priort}</option>;
        })}
      </select> */}
    </>
  );
};

export default Filter;

// {milestones, tags, assignees,
