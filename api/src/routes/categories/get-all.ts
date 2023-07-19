import { FastifyRequest, RouteOptions } from "fastify";
import { getAllCategories } from "../../business-logic";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestAdmin extends FastifyRequest {
  user?: any;
}

export const getAllCategoriesRoute: RouteOptions = {
  method: RouteMethod.GET,
  url: "/categories",
  // preHandler: verifyToken,
  handler: async (request: FastifyRequestAdmin, reply) => {
    try {
      const categories = await getAllCategories();
      reply.status(200).send(categories);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
