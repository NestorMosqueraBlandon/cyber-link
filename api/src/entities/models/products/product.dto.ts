import { Product } from './schema/product';

export type CreateProductDto = Omit<Product, '_id'>;
export type UpdateProductDto = Partial<Product>;