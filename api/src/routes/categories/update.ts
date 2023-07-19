import { RouteOptions } from "fastify";
import { RouteMethod } from "../../constant-definitions";
import { UpdateCategoryDto, UpdateProductDto } from "../../entities";
import { updateCategory, updateProduct, verifyToken } from "../../business-logic";

export const updateCategoryRoute: RouteOptions = {
  method: RouteMethod.PUT,
  url: "/categories",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as UpdateCategoryDto;
    try {
      const categories = await updateCategory(data);
      reply.status(200).send(categories);
    } catch (err) {
      if (err instanceof Error) {
        reply.status(500).send(err);
      }
    }
  },
};
