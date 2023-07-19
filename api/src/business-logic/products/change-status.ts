import { Collection, getModel } from "../../constant-definitions";
import { Product, ProductSchemaMongo, StatusType } from "../../entities";

export const ChangeStatusProduct = async (
  uuid: string
): Promise<Product | Error> => {
  const model = getModel<Product>(Collection.PRODUCTS, ProductSchemaMongo);
  const product = await model.findOne({ _id: uuid });
  if (!product) {
    throw new Error("product not found");
  }
  product.status = StatusType.DELETED;
  await product.save();
  return product;
};
