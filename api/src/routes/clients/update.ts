import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { UpdateClientDto } from "../../entities";
import { updateClient, verifyToken } from "../../business-logic";

export const updateClientRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/clients",
  preHandler: verifyToken,
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as UpdateClientDto;
    try {
      const client = await updateClient(data);
      reply.status(200).send(client);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
