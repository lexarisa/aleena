import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTasks = createAsyncThunk
('tasks/fetchTasks', async (milestone_id) => {

  const res = await fetch(`http://localhost:3001/milestone/${milestone_id}`); //need milestone id

  const data = await res.json();
  
  return data[0].tasks;
});
