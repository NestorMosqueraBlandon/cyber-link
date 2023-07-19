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
exports.UserSignup = void 0;
const constant_definitions_1 = require("../../../constant-definitions");
const entities_1 = require("../../../entities");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET } = process.env;
const UserSignup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const model = yield (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.USERS, entities_1.UserSchemaMongo);
    const find_user = yield model.findOne({ email: data.email });
    if (find_user) {
        return new Error("Usuario ya existe");
    }
    const password = bcrypt_1.default.hashSync(data.password || "", 10);
    const user = new model(Object.assign(Object.assign({}, data), { password: password }));
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ uuid: user._id }, JWT_SECRET, {
        expiresIn: "24h",
    });
    return { user, token };
});
exports.UserSignup = UserSignup;
