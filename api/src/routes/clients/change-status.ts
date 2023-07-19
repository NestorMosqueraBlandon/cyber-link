import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { ChangeStatusClient, verifyToken } from "../../business-logic";

type Params = {
  uuid: string;
};

export const ChangeStatusClientRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/clients/:uuid",
 // preHandler: verifyToken,
  handler: async (request, reply) => {
    const { params } = request;
    const { uuid } = params as Params;
    try {
      const client = await ChangeStatusClient(uuid);
      reply.status(200).send(client);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
