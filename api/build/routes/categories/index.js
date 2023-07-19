"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const create_1 = require("./create");
const get_all_1 = require("./get-all");
const update_1 = require("./update");
const change_status_1 = require("./change-status");
exports.categoriesRoutes = [
    create_1.createCategoryRoute,
    get_all_1.getAllCategoriesRoute,
    update_1.updateCategoryRoute,
    change_status_1.ChangeStatusCategoryRoute
];
