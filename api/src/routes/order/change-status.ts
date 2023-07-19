import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { ChangeStatusOrder } from "../../business-logic";

type Params = {
  uuid: string;
};

export const ChangeStatusOrderRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/orders/:uuid",
  handler: async (request, reply) => {
    const { params } = request;
    const { uuid } = params as Params;
    try {
      const order = await ChangeStatusOrder(uuid);
      reply.status(200).send(order);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
