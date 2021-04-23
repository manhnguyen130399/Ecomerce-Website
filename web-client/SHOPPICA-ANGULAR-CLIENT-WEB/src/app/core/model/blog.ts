import { Comment } from "./comment";

export interface Blog {
  id: number;
  summary: string;
  title: string;
  author: string;
  createdAt: Date;
  content: string;
  image: string;
  comments: Comment[]
}
