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
exports.loginRoute = void 0;
const business_logic_1 = require("../../business-logic");
exports.loginRoute = {
    method: 'POST',
    url: '/login',
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body } = request;
            const data = body;
            const user = yield (0, business_logic_1.UserSignin)(data);
            reply.status(200).send(user);
        }
        catch (err) {
            reply.status(500).send(err);
        }
    })
};
