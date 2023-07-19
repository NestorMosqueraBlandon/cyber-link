import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { ChangeStatusProduct, verifyToken } from "../../business-logic";

type Params = {
  uuid: string;
};

export const ChangeStatusProductRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/products/:uuid",
  //preHandler: verifyToken,
  handler: async (request, reply) => {
    const { params } = request;
    const { uuid } = params as Params;
    try {
      const product = await ChangeStatusProduct(uuid);
      reply.status(200).send(product);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
