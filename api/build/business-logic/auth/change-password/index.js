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
exports.ChangePassword = void 0;
const constant_definitions_1 = require("../../../constant-definitions");
const entities_1 = require("../../../entities");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ChangePassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const model = yield (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.USERS, entities_1.UserSchemaMongo);
    const user = yield model.findById({ _id: data.userId });
    if (!user) {
        return new Error("Usuario no encontrado");
    }
    const isCurrentPasswordValid = bcrypt_1.default.compareSync(data.currentPassword, user.get("password"));
    if (!isCurrentPasswordValid) {
        return new Error("La contraseña actual no es válida");
    }
    const newPasswordHash = bcrypt_1.default.hashSync(data.newPassword, 10);
    user.set("password", newPasswordHash);
    yield user.save();
});
exports.ChangePassword = ChangePassword;
