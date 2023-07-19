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
exports.UserUpdate = void 0;
const constant_definitions_1 = require("../../../constant-definitions");
const entities_1 = require("../../../entities");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET } = process.env;
const UserUpdate = (userId, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const model = yield (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.USERS, entities_1.UserSchemaMongo);
    try {
        const user = yield model.findOne({ _id: userId });
        if (!user) {
            return new Error("Usuario no encontrado");
        }
        if (newData.email && newData.email !== user.get("email")) {
            const existingUser = yield model.findOne({ email: newData.email });
            if (existingUser) {
                return new Error("Ya existe un usuario con el nuevo correo electrónico");
            }
        }
        if (newData.password) {
            delete newData.password;
        }
        yield model.updateOne({ _id: userId }, { $set: newData });
        const updatedUser = yield model.findOne({ _id: userId });
        if (!updatedUser) {
            return new Error("Hubo un error al actualizar el usuario");
        }
        const token = jsonwebtoken_1.default.sign({ uuid: updatedUser.id }, JWT_SECRET, { expiresIn: '5d' });
        return { token };
    }
    catch (error) {
        return new Error("Hubo un error al actualizar el usuario");
    }
});
exports.UserUpdate = UserUpdate;
