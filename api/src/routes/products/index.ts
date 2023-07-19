import { RouteOptions } from "fastify";
import { createProductRoute } from "./create";
import { getAllProductsRoute } from "./get-all";
import { deleteProductByIdRoute } from "./delete";
import { updateProductRoute } from "./update";
import { ChangeStatusProductRoute } from "./change-status";
import { getOneProductRoute } from "./get-one";

export const productsRoutes: RouteOptions[] = [
  createProductRoute,
  getAllProductsRoute,
  updateProductRoute,
  deleteProductByIdRoute,
  ChangeStatusProductRoute,
  getOneProductRoute
];
