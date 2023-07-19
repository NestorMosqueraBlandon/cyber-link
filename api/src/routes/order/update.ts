import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { UpdateOrderDto } from "../../entities";
import { updateOrder, verifyToken } from "../../business-logic";

export const updateOrderRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/orders",
  preHandler: verifyToken,
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as UpdateOrderDto;
    try {
      const order = await updateOrder(data);
      reply.status(200).send(order);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
