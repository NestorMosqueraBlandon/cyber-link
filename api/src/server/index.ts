import "dotenv/config";
import fastifyCors from "@fastify/cors";
import fastify, { FastifyInstance } from "fastify";
import { registerRoutes } from "../routes";
import fastifyMultipart from "@fastify/multipart";
import { initDataSources } from "../data-sources";
import { verify } from "../business-logic";

const { PORT, HOST, MONGODB_URL } = process.env;
const corsOptions = {
  origin: ["http://localhost:3000", "https://app.helebba.com", "https://generic-store-one.vercel.app", "https://cyber-link-orpin.vercel.app"],
};

const main = async () => {
  await initDataSources({
    mongoose: {
      mongoUrl: MONGODB_URL,
    },
  });

  const server: FastifyInstance = fastify({
    logger: true,
  });

  server.register(fastifyCors, corsOptions);

 // server.addHook("preValidation", verify);

  server.register(fastifyMultipart);

  server.register(
    (instance, options, next) => {
      registerRoutes(instance);
      next();
    },
    { prefix: "api/v1" }
  );

  await server.listen({ port: Number(PORT), host: HOST }, (error, address) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }
    server.log.info(`Backend App is running at http://${address}`);
    server.log.info("Press CTRL-c to stop");
  });
};

void main();
