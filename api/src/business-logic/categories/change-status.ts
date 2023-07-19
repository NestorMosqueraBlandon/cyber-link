import { Collection, getModel } from "../../constant-definitions";
import { Category, CategorySchemaMongo, StatusType } from "../../entities";

export const ChangeStatusCategory = async (
  uuid: string
): Promise<Category | Error> => {
  const model = getModel<Category>(Collection.CATEGORY, CategorySchemaMongo);
  const category = await model.findById(uuid);

  if (!category) {
    throw new Error("Category not found");
  }

  category.status = StatusType.DELETED;
  await category.save();
  return category;
};
