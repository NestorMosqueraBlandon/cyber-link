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
exports.createOrderRoute = void 0;
const business_logic_1 = require("../../business-logic");
const constant_definitions_1 = require("../../constant-definitions");
exports.createOrderRoute = {
    method: constant_definitions_1.RouteMethod.POST,
    url: "/orders",
    //preHandler: verifyToken,
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body } = request;
            const data = body;
            const order = yield (0, business_logic_1.createOrder)(data);
            reply.status(201).send(order);
        }
        catch (err) {
            reply.status(500).send(err);
        }
    }),
};