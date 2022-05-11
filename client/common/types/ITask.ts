import IUser from './IUser';

export default interface ITask {
  id: Number;
  title: String;
  users?: String[]; //IUser[];
  description?: String;
<<<<<<< HEAD
  status: String;
  priority: String;
  tags?: String[]; //Tags[]
  deadline?: String;
  milestone_id: String;
=======
  status?: String;
  priority?: String;
  tags?: String[]; //Tags[]
  deadline?: String;
  milestone_id?: String;
>>>>>>> development
  comments?: String[]; // Comment[]
  githubs?: String[]; // Github[]
  created_at: String; //Date;
  updated_at?: String; //Date;
}
