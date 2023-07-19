import { RouteOptions } from "fastify";
import { createCategoryRoute } from "./create";
import { getAllCategoriesRoute } from "./get-all";
import { updateCategoryRoute } from "./update";
import { ChangeStatusCategoryRoute } from "./change-status";

export const categoriesRoutes: RouteOptions[] = [
  createCategoryRoute,
  getAllCategoriesRoute,
  updateCategoryRoute,
  ChangeStatusCategoryRoute
];
