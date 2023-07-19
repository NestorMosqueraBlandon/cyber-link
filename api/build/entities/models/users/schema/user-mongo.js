"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaMongo = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../../../common");
const crypto_1 = __importDefault(require("crypto"));
exports.UserSchemaMongo = new mongoose_1.Schema({
    _id: { type: String, unique: true, default: () => crypto_1.default.randomUUID() },
    uuid: { type: String },
    name: { type: String },
    lastname: { type: String },
    identification: { type: Number },
    email: { type: String },
    address: { type: String },
    phone: { type: Number },
    photo: { type: String },
    username: { type: String },
    password: { type: String },
    status: { type: String, default: common_1.StatusType.ACTIVE },
}, {
    versionKey: false,
    timestamps: true,
});
exports.UserSchemaMongo.methods.toJSON = function () {
    const _a = this.toObject(), { _id } = _a, user = __rest(_a, ["_id"]);
    user.uuid = _id;
    return user;
};
