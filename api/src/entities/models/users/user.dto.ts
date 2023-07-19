import { User } from "./schema";

export type CreateUserDto = Omit<User, "_id">;
export type UpdateUserDto = Partial<User>;
