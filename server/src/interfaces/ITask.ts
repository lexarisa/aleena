import { IUser } from "./user";

export interface ITask {
  id: Number;
  title: String;
  users: IUser[]; //IUser[];
  description: String;
  user_id: Number;
  project_id: Number;
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

export interface IUpdateTask {
  project_id: number | IntFieldUpdateOperationsInput | undefined;
  user_id: number | IntFieldUpdateOperationsInput | undefined;
  title?: String;
  users?: IUser[]; //IUser[];
  description?: String;
  status?: String;
  priority?: String;
  tags?: String[]; //Tags[]
  deadline?: String;
  milestone_id?: String;
  comments?: {
    user_id?: Number;
    project_id?: Number;
    task_id?: Number;
    description?: String;
  }; // Comment[]
  githubs?: String[]; // Github[]
  created_at: String; //Date;
  updated_at: String; //Date;
}
