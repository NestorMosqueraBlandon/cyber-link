"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModel = void 0;
const mongoose_1 = require("mongoose");
const getModel = (collectionName, schema) => {
    return (0, mongoose_1.model)(collectionName, schema);
};
exports.getModel = getModel;
