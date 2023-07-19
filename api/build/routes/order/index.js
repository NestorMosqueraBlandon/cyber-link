"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoutes = void 0;
const create_1 = require("./create");
const get_all_1 = require("./get-all");
const update_1 = require("./update");
const change_status_1 = require("./change-status");
exports.ordersRoutes = [
    create_1.createOrderRoute,
    get_all_1.getAllOrdersRoute,
    update_1.updateOrderRoute,
    change_status_1.ChangeStatusOrderRoute,
];
