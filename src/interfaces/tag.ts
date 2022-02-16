export interface ITag {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  card: string|object;
}

export interface ITagInput {
  title: string;
  card: string;
}
