export default interface Task {
  id: Number;
  title: String;
  description: String;
  status: String;
  priority: String;
  tags: String[]; //Tags[]
  deadline: String;
  milestone_id: String;
  comments: String[]; // Comment[]
  github: String[]; // Github[]
  created_at: String;
  //user?
}
