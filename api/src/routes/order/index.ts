import { RouteOptions } from "fastify";
import { createOrderRoute } from "./create";
import { getAllOrdersRoute } from "./get-all";
import { updateOrderRoute } from "./update";
import { ChangeStatusOrderRoute } from "./change-status";
import { UpdateStatusOrderRoute } from "./update-status";

export const ordersRoutes: RouteOptions[] = [
  createOrderRoute,
  getAllOrdersRoute,
  updateOrderRoute,
  ChangeStatusOrderRoute,
  UpdateStatusOrderRoute
];
