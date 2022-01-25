export interface ISignInInput {
    uid: string;
    password: string;
}

export interface ISignUpInput {
    uid: string;
    password: string;
    repassword: string;
    nickname: string;
}

export interface IUser {
    _id: string;
    createdAt: string;
    updatedAt: string;

    uid: string;
    nickname: string;
}

export interface ISign {
    token: string;
    user: IUser;
}