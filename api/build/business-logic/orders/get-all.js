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
exports.getAllOrders = void 0;
const constant_definitions_1 = require("../../constant-definitions");
const entities_1 = require("../../entities");
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const model = (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.ORDERS, entities_1.OrderSchemaMongo);
    (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.USERS, entities_1.UserSchemaMongo);
    (0, constant_definitions_1.getModel)(constant_definitions_1.Collection.PRODUCTS, entities_1.ProductSchemaMongo);
    const order = yield model
        .find({ status: "active" })
        .populate({
        path: "user",
        select: "name",
    })
        .populate({ path: "products", select: "name" });
    return order;
});
exports.getAllOrders = getAllOrders;
