import { useAppDispatch } from "../../hooks/redux-hooks";
import { setSseTasks } from "./tasks.slices";


// export const sseTasks = () => {
//     const dispatch = useAppDispatch();
//     console.log('hit damn good')
//     const task = new EventSource('http://localhost:3001/tasks/sse');

//     task.addEventListener('message', (tsk) => {
//       const newTask = JSON.parse(tsk.data);

//       console.log('lucky ?', newTask)
//       dispatch(setSseTasks(newTask));
//     });

//     task.close();
// };