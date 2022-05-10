export default interface ITask {
  id: Number;
  title: String;
  users: String[]; //IUser[];
  description: String;
  status: String;
  priority: String;
  tags: String[]; //Tags[]
  deadline: String;
  milestone_id: String;
  comments: String[]; // Comment[]
  githubs: String[]; // Github[]
  created_at: String; //Date;
  updated_at: String; //Date;
}
