export interface ICard {
    _id: string;
    createdAt: Date;
    updatedAt: Date;

    user: string;
    title: string;
    contents?: string;
}

export interface ICardInput {
    title: string;
    contents?: string;
}