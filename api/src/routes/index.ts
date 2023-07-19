import { FastifyInstance, RouteOptions } from "fastify";
import { authRoutes } from "./auth";
import { productsRoutes } from "./products";
import { categoriesRoutes } from "./categories";
import { clientsRoutes } from "./clients";
import { registerClientRoute } from "./clients/register";
import { filesRoutes } from "./files";
import { ordersRoutes } from "./order";

const routes: RouteOptions[] = [
  ...authRoutes,
  ...productsRoutes,
  ...categoriesRoutes,
  ...clientsRoutes,
  ...filesRoutes,
  ...ordersRoutes,
];

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.log.warn("Registering routes");

  routes.map((route) => {
    fastify.route(route);
  });
};
