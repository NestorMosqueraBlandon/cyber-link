import { Collection, getModel } from "../../constant-definitions";
import { Product, ProductSchemaMongo, UpdateProductDto } from "../../entities";

export const updateProduct = async (
  data: UpdateProductDto
): Promise<Product | Error> => {
  console.log(
    "============================================================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    data.uuid
  );
  const model = getModel<Product>(Collection.PRODUCTS, ProductSchemaMongo);
  const product = await model.findOne({ _id: data.uuid });
  if (!product) throw new Error(`Product don't exist`);
  const dataToUpdate = { ...data };
  await product.updateOne(dataToUpdate);
  return product;
};
