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
exports.uploadImageRoute = void 0;
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const files_1 = require("../../business-logic/files");
const constant_definitions_1 = require("../../constant-definitions");
const upload = (0, fastify_multer_1.default)({ dest: "uploads" });
exports.uploadImageRoute = {
    method: constant_definitions_1.RouteMethod.POST,
    url: "/upload/image",
    preHandler: upload.single("image"),
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { file } = request;
            const image = yield (0, files_1.UploadImage)(file.path);
            reply.status(201).send(image);
        }
        catch (err) {
            reply.status(500).send(err);
        }
    }),
};
