import { Admin } from "./schema";

export type CreateAdminDto = Omit<Admin, "id">;
export type UpdateAdminDto = Partial<Admin>;
