import { Collection, getModel } from "../../constant-definitions";
import { Category, CategorySchemaMongo, CreateCategoryDto } from "../../entities";


export const createCategory = async ( data: Partial<CreateCategoryDto> ): Promise<Category | Error> => {
  const model = getModel<Category>(Collection.CATEGORY, CategorySchemaMongo);
  const category = new model(data);
  await category.save();
  return category;
};
