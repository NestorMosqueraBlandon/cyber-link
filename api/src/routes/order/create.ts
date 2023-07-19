import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { createOrder, verifyToken } from "../../business-logic";
import { CreateOrderDto } from "../../entities";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestUser extends FastifyRequest {
  user?: any;
}

export const createOrderRoute: RouteOptions = {
  method: RouteMethod.POST,
  url: "/orders",
  //preHandler: verifyToken,
  handler: async (request: FastifyRequestUser, reply: FastifyReply) => {
    try {
      const { body } = request;
      const data = body as CreateOrderDto;
      const order = await createOrder(data);
      reply.status(201).send(order);
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
