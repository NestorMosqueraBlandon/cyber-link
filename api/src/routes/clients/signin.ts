import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { signin } from "../../business-logic";

export const signinRoute: RouteOptions = {
 method: 'POST',
 url: '/signin',
 handler: async (request: FastifyRequest, reply: FastifyReply) => {
  try{
   const { body } = request;
   const data = body as {email: string, password: string}
   const user = await signin(data);
   reply.status(200).send(user);
  }catch(err){
   reply.status(500).send(err);
  }
 }
}