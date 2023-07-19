import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { CreateUserDto } from "../../entities";
import { UserSignup } from "../../business-logic";
import { register } from "../../business-logic/clients/register";

export const registerClientRoute: RouteOptions = {
  method: "POST",
  url: "/register-client",
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { body } = request;
      const data = body as CreateUserDto;
      const user = await register(data);
      reply.status(201).send(user);
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
