"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const login_1 = require("./login");
const register_1 = require("./register");
const changePassword_1 = require("./changePassword");
const update_1 = require("./update");
exports.authRoutes = [
    login_1.loginRoute,
    register_1.registerUserRoute,
    changePassword_1.updatePasswordRoute,
    update_1.updateUserRoute
];
