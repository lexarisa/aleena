import styles from '../../styles/Filter.module.css';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';
import { stat } from 'fs';
import CustomButton from './small/CustomButton';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { filterTasks } from '../../pages/api/taskApi';
import { setAllFilterTask } from '../store/slices/task/task.slices';

const Filter = () => {
  //milestones
  const dispatch = useAppDispatch()
  const [showCollapsible, setShowCollapsible] = useState(false);
  
  // FORM DATA
  const status: String[] = [
    'To Do',
    'In Progress',
    'Review',
    'Done',
    'Backlog',
  ];
  const priority: String[] = ['none', 'Low', 'Medium', 'High', 'Urgent'];
  const reduxCurrentProject = useAppSelector((state) => state.project.currentProject)
  const reduxAllMilestones = useAppSelector((state) => state.milestone.allMilestones);
  const reduxAllUsersProject = useAppSelector((state) => state.project.allUsersInProject);

  // FORM LOGIC
  const [selectStatus, setSelectStatus] = useState([] as any)
  const [selectPriority, setSelectPriority] = useState([] as any)
  const [selectAssignee, setSelectAssignee] = useState([] as any)
  const [selectMilestone, setSelectMilestone] = useState([] as any)
  const [selectTags, setSelectTags] = useState([] as any)

  const handleClickStatus = (label: any) => {
    console.log('begin form', selectStatus)
    setSelectStatus(() => {
      if (selectStatus.includes(label)){
        return selectStatus.filter((el: any) => el !== label)
      } else {
        return [...selectStatus, label]
      }
    })
    console.log('end form', selectStatus)
  };

  const handleClick = (target: any, func: any, setFunc: any, params?: string,) => {
    console.log('cond', func.includes(target))
    setFunc(() => {
      if (func.includes(target)){
        if (params){
          return func.filter((el: any) => el[params] !== target)
        } else {
          return func.filter((el: any) => el !== target)
        }
      } else {
        return [...func, target]
      }
    })
    console.log('end form', func)
  };

  const handleSubmitFilter = async () => {
    const data: any = {}

    if (reduxCurrentProject.id) data.project_id = reduxCurrentProject.id;
    if (selectPriority.length) data.filterPriority = selectPriority;
    if (selectStatus.length) data.filterStatus = selectStatus;
    if (selectMilestone.length) data.filterMileIds = selectMilestone;
    if (selectAssignee.length) data.filterAssignees = selectAssignee; 

    const filtered = await filterTasks(data)

    const flatFilt = filtered.flat()
    console.log('WOOOOW IT WORKED', flatFilt)
    dispatch(setAllFilterTask(flatFilt))
  }

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
            {status.map((label: any, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(label, selectStatus, setSelectStatus)}
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
                  onClick={() => handleClick(prt, selectPriority, setSelectPriority)}
                  className={styles.list}
                >
                  {prt}
                </li>
              );
            })}
          </div>
        </div>

        <div className={styles.column}>
          <p className={styles.section}>
            Assignees <MdKeyboardArrowDown className={styles.icon2} />
          </p>
          <div className={styles.select}>
            {reduxAllUsersProject && reduxAllUsersProject.map((user: any, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(user.user.id, selectAssignee, setSelectAssignee)}
                  className={styles.list}
                >
                  {user.user.username}
                </li>
              );
            })}
          </div>
        </div>

        <div className={styles.column}>
          <p className={styles.section}>
            Milestones <MdKeyboardArrowDown className={styles.icon2} />
          </p>
          <div className={styles.select}>
            {reduxAllMilestones && reduxAllMilestones.map((miles: any, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(miles.id, selectMilestone, setSelectMilestone)}
                  className={styles.list}
                >
                  {miles.title}
                </li>
              );
            })}
          </div>
        </div>


        <div className={styles.filterButton}>
          <CustomButton
            button="Filter"
            color="#e63946"
            textColor="#fff;"
            onClick={handleSubmitFilter}
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
