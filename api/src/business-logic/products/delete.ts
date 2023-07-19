import { Collection, getModel } from "../../constant-definitions";
import { Product, ProductSchemaMongo } from "../../entities";

export const deleteProduct = async (uuid: string): Promise<Boolean | Error> => {
  const model = getModel<Product>(Collection.PRODUCTS, ProductSchemaMongo);
  const product = await model.findOne({ uuid });
  if (!product) {
    throw new Error("No se encontro el producto");
  }
  await model.deleteOne({ uuid });
  return true;
};
