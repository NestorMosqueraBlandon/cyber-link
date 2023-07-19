import { Collection, getModel } from "../../constant-definitions";
import { Category, CategorySchemaMongo, StatusType } from "../../entities";

export const getAllCategories = async (): Promise<Category[]> => {
  const model = getModel<Category>(Collection.CATEGORY, CategorySchemaMongo);
  const categories = await model.find({ status: StatusType.ACTIVE });
  return categories;
};
