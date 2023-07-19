import { Collection, getModel } from "../../constant-definitions";
import {
  Category,
  CategorySchemaMongo,
  Product,
  ProductSchemaMongo,
  StatusType,
} from "../../entities";

export const getAllProducts = async (): Promise<Product[]> => {
  const model = getModel<Product>(Collection.PRODUCTS, ProductSchemaMongo);
  getModel<Category>(Collection.CATEGORY, CategorySchemaMongo);
  const products = await model.find({status: StatusType.ACTIVE}).populate({
    path: "category",
    select: "name",
  });
  return products;
};
