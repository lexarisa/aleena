import IUser from './IUser';
import ITask from './ITask';

export default interface IComment {
  id: Number;
  created_at: Date;
  updated_at: Date;
  description: String;
  user_id: Number;
  task_id: Number;
  user: IUser;
  task: ITask;
}
