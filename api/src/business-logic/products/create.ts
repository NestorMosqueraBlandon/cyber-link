import { Collection, getModel } from "../../constant-definitions";
import { CreateProductDto, Product, ProductSchemaMongo } from "../../entities";

export const createProduct = async ( data: Partial<CreateProductDto> ): Promise<Product | Error> => {
  const model = getModel<Product>(Collection.PRODUCTS, ProductSchemaMongo);
  const product = new model(data);
  await product.save();
  return product;
};
