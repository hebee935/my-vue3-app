export interface IComment {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  user: string|object;
  card: string;
  message: string;
  parent?: string;
}

export interface ICommentInput {
  message: string;
  card: string;
  parent?: string;
}
