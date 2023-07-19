"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = void 0;
const create_1 = require("./create");
const get_all_1 = require("./get-all");
const delete_1 = require("./delete");
const update_1 = require("./update");
const change_status_1 = require("./change-status");
const get_one_1 = require("./get-one");
exports.productsRoutes = [
    create_1.createProductRoute,
    get_all_1.getAllProductsRoute,
    update_1.updateProductRoute,
    delete_1.deleteProductByIdRoute,
    change_status_1.ChangeStatusProductRoute,
    get_one_1.getOneProductRoute
];
