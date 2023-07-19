import { Collection, getModel } from "../../constant-definitions";
import {
  Category,
  CategorySchemaMongo,
  Product,
  ProductSchemaMongo,
} from "../../entities";

export const getOneProduct = async (uuid: string): Promise<Product> => {
  const model = getModel<Product>(Collection.PRODUCTS, ProductSchemaMongo);
  getModel<Category>(Collection.CATEGORY, CategorySchemaMongo);

  const product = await model.findById(uuid).populate({
    path: "category",
    select: "name",
  }) as Product;
  return product;
};
