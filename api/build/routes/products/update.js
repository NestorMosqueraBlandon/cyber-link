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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductRoute = void 0;
const constant_definitions_1 = require("../../constant-definitions");
const business_logic_1 = require("../../business-logic");
exports.updateProductRoute = {
    method: constant_definitions_1.RouteMethod.PUT,
    url: "/products",
    preHandler: business_logic_1.verifyToken,
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = request;
        const data = body;
        try {
            const obj = yield (0, business_logic_1.updateProduct)(data);
            reply.status(200).send(obj);
        }
        catch (err) {
            if (err instanceof Error) {
                reply.status(500).send(err);
            }
        }
    }),
};
