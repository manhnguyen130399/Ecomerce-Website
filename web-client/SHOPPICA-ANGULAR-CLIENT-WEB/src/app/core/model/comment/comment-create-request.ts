export interface CommentCreateRequest {
  productId?: number;
  blogId?: number;
  content: string;
  rating?: number;
}
