import React, { useState } from 'react';
import styles from '../../styles/CreateForm.module.css';

const CreateForm = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setProjectTitle(e.currentTarget.value);
  };
  return (
    <div className={styles.container}>
      <form>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Add a project title"
          name="title"
          onChange={handleChange}
          value={projectTitle}
        />
        <label className={styles.select}>Add Milestones</label>
      </form>
    </div>
  );
};

export default CreateForm;
