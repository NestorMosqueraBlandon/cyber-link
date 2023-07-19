"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("../routes");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const data_sources_1 = require("../data-sources");
const { PORT, HOST, MONGODB_URL } = process.env;
const corsOptions = {
    origin: ["http://localhost:3000", "https://app.helebba.com", "https://generic-store-one.vercel.app"],
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, data_sources_1.initDataSources)({
        mongoose: {
            mongoUrl: MONGODB_URL,
        },
    });
    const server = (0, fastify_1.default)({
        logger: true,
    });
    server.register(cors_1.default, corsOptions);
    // server.addHook("preValidation", verify);
    server.register(multipart_1.default);
    server.register((instance, options, next) => {
        (0, routes_1.registerRoutes)(instance);
        next();
    }, { prefix: "api/v1" });
    yield server.listen({ port: Number(PORT), host: HOST }, (error, address) => {
        if (error) {
            server.log.error(error);
            process.exit(1);
        }
        server.log.info(`Backend App is running at http://${address}`);
        server.log.info("Press CTRL-c to stop");
    });
});
void main();
