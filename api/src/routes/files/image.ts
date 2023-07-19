import { RouteOptions, FastifyRequest, FastifyReply } from "fastify";
import multer from "fastify-multer";
import { UploadImage } from "../../business-logic/files";
import { RouteMethod } from "../../constant-definitions";

const upload = multer({ dest: "uploads" });

export const uploadImageRoute: RouteOptions = {
  method: RouteMethod.POST,
  url: "/upload/image",
  preHandler: upload.single("image"),
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { file } = request as any;
      const image = await UploadImage(file.path);
      reply.status(201).send(image);
    } catch (err) {
      reply.status(500).send(err);
    }
  },
};
