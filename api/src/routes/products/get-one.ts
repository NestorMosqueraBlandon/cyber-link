import { FastifyRequest, RouteOptions } from "fastify";
import { getAllProducts, verifyToken } from "../../business-logic";
import { RouteMethod } from "../../constant-definitions";
import { getOneProduct } from "../../business-logic/products/get-one";

interface FastifyRequestAdmin extends FastifyRequest {
  user?: any;
}

interface Params {
  uuid: string
}

export const getOneProductRoute: RouteOptions = {
  method: RouteMethod.GET,
  url: "/products/:uuid",
  // preHandler: verifyToken,
  handler: async (request: FastifyRequestAdmin, reply) => {
    try {
      const { params } = request;
      const { uuid } = params as Params;
      const product = await getOneProduct(uuid);
      reply.status(200).send(product);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
