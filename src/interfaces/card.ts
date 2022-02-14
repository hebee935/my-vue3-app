export interface ICard {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  user: any;
  title: string;
  contents?: string;
  image?: string;
}

export interface ICardInput {
  title: string;
  contents?: string;
  image?: string;
}
