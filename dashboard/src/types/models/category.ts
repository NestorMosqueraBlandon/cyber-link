export interface Category {
  _id: string;
  uuid: string;
  name: string;
  status: string;
}

export type CreateCategoryDto = Omit<Category, "_id">;
export type UpdateCategoryDto = Partial<Category>;
