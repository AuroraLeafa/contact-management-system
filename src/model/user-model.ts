import { User } from "@prisma/client";

export type UserResponse = {
    username: string,
    name: string,
    token?: string,
};

export type CreateUserRequest = {
    username: string,
    password: string,
    name: string,
}

export type UpdateUserRequest = {
    username: string,
    name: string,
}

export const toUserResponse = (user: User): UserResponse => {
    return {
        name : user.name,
        username : user.username
    }
}