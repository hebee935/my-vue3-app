export interface ICard {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  user: string|object;
  title: string;
  contents?: string;
  image?: string;
}

export interface ICardInput {
  title: string;
  contents?: string;
  image?: string;
}
