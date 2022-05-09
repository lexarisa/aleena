import IMilestone from './IMilestone';

export default interface IDocumentation {
  id: Number;
  created_at: Date;
  milestone_id: Number;
  milestone: IMilestone;
  // documentationDetails: IDocumentationDetail[];
}
