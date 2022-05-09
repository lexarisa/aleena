import ITask from './ITask';
import IProject from './IProject';
import IDocumentation from './IDocumentation';

export default interface IMilestone {
  id: Number;
  created_at: Date;
  updated_at: Date;
  title: String;
  status: String;
  project_id: Number;
  project: IProject;
  tasks: ITask[];
  documents: IDocumentation[];
}
