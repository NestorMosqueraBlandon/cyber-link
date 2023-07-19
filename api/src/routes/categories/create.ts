import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { createCategory } from "../../business-logic";
import { CreateCategoryDto } from "../../entities";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestUser extends FastifyRequest {
  user?: any;
}

export const createCategoryRoute: RouteOptions = {
  method: RouteMethod.POST,
  url: "/categories",
  // preHandler: verifyToken,
  handler: async (request: FastifyRequestUser, reply: FastifyReply) => {
    try {
      const { body } = request;
      const data = body as CreateCategoryDto;
      const category = await createCategory(data);
      reply.status(201).send(category);
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
