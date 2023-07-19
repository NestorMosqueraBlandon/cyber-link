import { Collection, getModel } from "../../constant-definitions";
import {
  Category,
  CategorySchemaMongo,
  UpdateCategoryDto,
} from "../../entities";

export const updateCategory = async (data: UpdateCategoryDto): Promise<Category | Error> => {
  const model = getModel<Category>(Collection.CATEGORY, CategorySchemaMongo);
  const category = await model.findById({ _id: data.uuid });
  if (!category) throw new Error(`category don't exist`);
  const dataToUpdate = { ...data };
  await category.updateOne(dataToUpdate);
  return category;
};
