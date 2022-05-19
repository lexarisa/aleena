import ITask from './ITask';
import IProject from './IProject';
import IComment from './IComment';
export default interface IUser {
  id: Number;
  created_at: Date;
  updated_at: Date;
  email: String;
  username: String;
  // password:String,
  firstname: String;
  lastname: String;
  slack_id: String;
  profile_pic: String;
  status: String;
  tasks: ITask[];
  comments: IComment[];
  projects: IProject[];
  // bookMarks: IBookmarks[];
}
