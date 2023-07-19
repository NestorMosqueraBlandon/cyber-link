"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRoutes = void 0;
const create_1 = require("./create");
const get_all_1 = require("./get-all");
const update_1 = require("./update");
const change_status_1 = require("./change-status");
const signin_1 = require("./signin");
const register_1 = require("./register");
exports.clientsRoutes = [
    create_1.createClientRoute,
    get_all_1.getAllClientsRoute,
    update_1.updateClientRoute,
    change_status_1.ChangeStatusClientRoute,
    signin_1.signinRoute,
    register_1.registerClientRoute
];
