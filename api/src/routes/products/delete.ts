import { RouteOptions } from "fastify";
import { deleteProduct } from "../../business-logic";
import { RouteMethod } from "../../constant-definitions";

type Params = {
  id: string;
};

export const deleteProductByIdRoute: RouteOptions = {
  method: RouteMethod.DELETE,
  url: "/products/:id",
  handler: async (request, reply) => {
    const { params } = request;
    const { id } = params as Params;
    try {
      const deleted = await deleteProduct(id);
      reply.send(deleted);
    } catch (err) {
      if (err instanceof Error) {
        reply.send(err.message);
      }
    }
  },
};
