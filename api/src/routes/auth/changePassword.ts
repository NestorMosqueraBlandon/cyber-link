import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { ChangePassword } from "../../business-logic";
import { RouteMethod } from "../../constant-definitions";

interface BodyPassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const updatePasswordRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/users/change/password",
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { body } = request;
      const data = body as BodyPassword;
      await ChangePassword(data);
      reply.status(200).send("Contraseña actualizada exitosamente");
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
