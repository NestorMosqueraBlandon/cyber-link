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
exports.createClient = void 0;
const constant_definitions_1 = require("../../constant-definitions");
const entities_1 = require("../../entities");
const createClient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const model = (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.CLIENTS, entities_1.ClientSchemaMongo);
    const client = new model(data);
    yield client.save();
    return client;
});
exports.createClient = createClient;
