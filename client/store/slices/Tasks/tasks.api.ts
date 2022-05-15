import { createAsyncThunk } from '@reduxjs/toolkit';

export const sseTasks = createAsyncThunk
('task/sseTask', async () => {

    const task = new EventSource('http://localhost:3001/tasks/sse');

    task.addEventListener('message', (tsk) => {
      const newTask = JSON.parse(tsk.data);

      return newTask
    });

    task.close();
});