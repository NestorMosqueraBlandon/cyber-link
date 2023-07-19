import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { createProduct, verifyToken } from "../../business-logic";
import { CreateProductDto } from "../../entities";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestUser extends FastifyRequest {
  user?: any;
}

export const createProductRoute: RouteOptions = {
  method: RouteMethod.POST,
  url: "/products",
 // preHandler: verifyToken,
  handler: async (request: FastifyRequestUser, reply: FastifyReply) => {
    try {
      const { body } = request;
      const data = body as CreateProductDto;
      const product = await createProduct(data);
      reply.status(201).send(product);
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
