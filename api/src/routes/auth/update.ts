import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { UpdateUserDto } from "../../entities";
import { UserUpdate } from "../../business-logic";

interface Params {
  userId: string;
}

export const updateUserRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/users/:userId",
  handler: async (request, reply) => {
    const { params, body } = request;
    const { userId } = params as Params;
    const data = body as UpdateUserDto;
    try {
      const updatedUser = await UserUpdate(userId, data);
      reply.status(200).send(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
