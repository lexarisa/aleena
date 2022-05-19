import IUser from './IUser';
import IMilestone from './IMilestone';

export default interface IProject {
  id: Number;
  created_at: Date;
  updated_at?: Date;
  title: String;
  description?: String;
  status?: String;
  deadline?: Date;
  user?: IUser[];
  milestones?: IMilestone[];
}
