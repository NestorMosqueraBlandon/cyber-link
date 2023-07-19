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
exports.CategorySchemaMongo = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const common_1 = require("../../../common");
exports.CategorySchemaMongo = new mongoose_1.Schema({
    _id: { type: String, unique: true, default: () => crypto_1.default.randomUUID() },
    uuid: { type: String },
    name: { type: String, required: true },
    status: { type: String, default: common_1.StatusType.ACTIVE },
}, {
    versionKey: false,
    timestamps: true,
});
exports.CategorySchemaMongo.methods.toJSON = function () {
    const _a = this.toObject(), { _id } = _a, category = __rest(_a, ["_id"]);
    category.uuid = _id;
    return category;
};
