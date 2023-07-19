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
exports.signin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_definitions_1 = require("../../constant-definitions");
const entities_1 = require("../../entities");
const { JWT_SECRET } = process.env;
const signin = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const model = (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.CLIENTS, entities_1.ClientSchemaMongo);
    console.log({ email });
    const client = yield model.findOne({ email });
    console.log(client);
    if (!client)
        throw new Error("Invalid credentials");
    if (password == null)
        return new Error('102');
    const isValidPassword = yield bcrypt_1.default.compare(password, client.password);
    if (!isValidPassword)
        return new Error('103');
    const token = jsonwebtoken_1.default.sign({ uuid: client.uuid }, JWT_SECRET, { expiresIn: "24h" });
    return {
        name: client.name,
        lastname: client.lastname,
        email: client.email,
        phone: client.phone,
        token
    };
});
exports.signin = signin;
