"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const auth_1 = require("./auth");
const products_1 = require("./products");
const categories_1 = require("./categories");
const clients_1 = require("./clients");
const files_1 = require("./files");
const order_1 = require("./order");
const routes = [
    ...auth_1.authRoutes,
    ...products_1.productsRoutes,
    ...categories_1.categoriesRoutes,
    ...clients_1.clientsRoutes,
    ...files_1.filesRoutes,
    ...order_1.ordersRoutes,
];
const registerRoutes = (fastify) => {
    fastify.log.warn("Registering routes");
    routes.map((route) => {
        fastify.route(route);
    });
};
exports.registerRoutes = registerRoutes;
