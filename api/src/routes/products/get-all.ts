import { FastifyRequest, RouteOptions } from "fastify";
import { getAllProducts, verifyToken } from "../../business-logic";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestAdmin extends FastifyRequest {
  user?: any;
}

export const getAllProductsRoute: RouteOptions = {
  method: RouteMethod.GET,
  url: "/products",
  // preHandler: verifyToken,
  handler: async (request: FastifyRequestAdmin, reply) => {
    try {
      const products = await getAllProducts();
      reply.status(200).send(products);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
