export interface INewArticle {
  id: number;
  created_at: Date;
  updated_at?: Date;
  title: string;
  content: string;
  documentation_id: number;
  user_id?: number;
}
