import { RouteOptions } from "fastify";
import { createClientRoute } from "./create";
import { getAllClientsRoute } from "./get-all";
import { updateClientRoute } from "./update";
import { ChangeStatusClientRoute } from "./change-status";
import { signinRoute } from "./signin";
import { registerClientRoute } from "./register";

export const clientsRoutes: RouteOptions[] = [
  createClientRoute,
  getAllClientsRoute,
  updateClientRoute,
  ChangeStatusClientRoute,
  signinRoute,
  registerClientRoute
];
