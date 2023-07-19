import { Category } from "./schema";

export type CreateCategoryDto = Omit<Category, '_id'>;
export type UpdateCategoryDto = Partial<Category>;