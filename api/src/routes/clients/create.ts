import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { createClient, createProduct, verifyToken } from "../../business-logic";
import { CreateClientDto, CreateProductDto } from "../../entities";
import { RouteMethod } from "../../constant-definitions";

interface FastifyRequestUser extends FastifyRequest {
  user?: any;
}

export const createClientRoute: RouteOptions = {
  method: RouteMethod.POST,
  url: "/clients",
 preHandler: verifyToken,
  handler: async (request: FastifyRequestUser, reply: FastifyReply) => {
    try {
      const { body } = request;
      const data = body as CreateClientDto;
      const client = await createClient(data);
      reply.status(201).send(client);
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
