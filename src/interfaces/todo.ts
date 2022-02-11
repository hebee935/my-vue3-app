export interface ITodo {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  status: string;
  user: string|object;
}

export interface ITodoInput {
  text: string;
  status?: string;
}
