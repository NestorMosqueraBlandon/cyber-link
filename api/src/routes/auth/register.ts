import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { CreateUserDto } from "../../entities";
import { UserSignup } from "../../business-logic";

export const registerUserRoute: RouteOptions = {
  method: "POST",
  url: "/register",
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { body } = request;
      const data = body as CreateUserDto;
      const user = await UserSignup(data);
      reply.status(201).send(user);
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
