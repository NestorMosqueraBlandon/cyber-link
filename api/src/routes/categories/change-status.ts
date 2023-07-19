import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { UpdateCategoryDto, UpdateProductDto } from "../../entities";
import {
  ChangeStatusCategory,
  updateCategory,
  verifyToken,
} from "../../business-logic";

type Params = {
  uuid: string;
};

export const ChangeStatusCategoryRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/categories/:uuid",
  //preHandler: verifyToken,
  handler: async (request, reply) => {
    const { params } = request;
    const { uuid } = params as Params;
    try {
      const categories = await ChangeStatusCategory(uuid);
      reply.status(200).send(categories);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
