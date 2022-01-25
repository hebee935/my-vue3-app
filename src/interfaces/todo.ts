export interface ITodo {
    _id: string;
    createdAt: Date;
    updatedAt: Date;

    text: string;
}

export interface ITodoInput {
    text: string;
}