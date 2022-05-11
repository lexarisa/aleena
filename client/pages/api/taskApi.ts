import ITask from '../../common/types/ITask';

export const createNewTask = async (task: ITask) => {
  try {
    const newTask = await fetch(`${process.env.BASEURL}/task`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' },
    });
    return await newTask.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTask = async (id: string) => {
  try {
    const singleTask = await fetch(`${process.env.BASEURL}/${id}`);
    return await singleTask.json();
  } catch (error) {
    console.log(error);
  }
};
