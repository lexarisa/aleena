import IUser from './IUser';

export default interface ITask {
  id?: Number;
  title?: String;
  users?: String[]; //IUser[];
  description?: String;
  status?: String;
  priority?: String;
  tags?: String[]; //Tags[]
  user_id: Number;
  deadline?: String;
  milestone_id?: Number;
  comments?: String[]; // Comment[]
  githubs?: String[]; // Github[]
  created_at?: String; //Date;
  updated_at?: String; //Date;
  project_id: Number;
}
