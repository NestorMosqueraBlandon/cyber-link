import { FastifyRequest, RouteOptions } from "fastify";
import { getAllOrders, verifyToken } from "../../business-logic";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestAdmin extends FastifyRequest {
  user?: any;
}

export const getAllOrdersRoute: RouteOptions = {
  method: RouteMethod.GET,
  url: "/orders",
  preHandler: verifyToken,
  handler: async (request: FastifyRequestAdmin, reply) => {
    try {
      const orders = await getAllOrders();
      reply.status(200).send(orders);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
