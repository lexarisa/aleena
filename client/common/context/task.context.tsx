import React, { createContext, useState } from "react";

const tasksDefaultValues = {
  tasks: [{}],
  createTasks: () => {},
  updateTasks: () => {},
}

export const TaskContext = createContext(tasksDefaultValues);

type TasksContextProviderProps = {
    children: React.ReactNode
}

export const TaskProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<any[]>([])
  const createTask = (newTask: any) => {
    setTasks([...tasks, newTask]);
  };

  const updateTasks = (updateTask: any): void => {
    const oldTasks = tasks.filter((task: any) => task.id !== updateTask.id);

    setTasks([...oldTasks, updateTask])
  };

  return (
    // @ts-ignore
    <TaskContext.Provider value={{ tasks, createTask, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
