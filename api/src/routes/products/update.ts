import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { UpdateProductDto } from "../../entities";
import { updateProduct, verifyToken } from "../../business-logic";

export const updateProductRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/products",
  preHandler: verifyToken,
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as UpdateProductDto;
    try {
      const obj = await updateProduct(data);
      reply.status(200).send(obj);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
