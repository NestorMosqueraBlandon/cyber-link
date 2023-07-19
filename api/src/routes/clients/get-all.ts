import { FastifyRequest, RouteOptions } from "fastify";
import { getAllClients, getAllProducts, verifyToken } from "../../business-logic";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestAdmin extends FastifyRequest {
  user?: any;
}

export const getAllClientsRoute: RouteOptions = {
  method: RouteMethod.GET,
  url: "/clients",
  preHandler: verifyToken,
  handler: async (request: FastifyRequestAdmin, reply) => {
    try {
      const clients = await getAllClients();
      reply.status(200).send(clients);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
