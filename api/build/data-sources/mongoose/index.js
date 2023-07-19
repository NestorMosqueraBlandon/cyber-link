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
exports.initMongoose = void 0;
const mongoose_1 = require("mongoose");
const initMongoose = ({ mongoUrl }) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = mongoose_1.connection;
    const connectionUrl = mongoUrl || '';
    conn.on('error', (err) => {
        console.error(`Error on mongoose connection: ${JSON.stringify(err)}`);
        throw new Error(err);
    });
    conn.on('connected', () => {
        console.info(`Mongoose connection: ${connectionUrl}`);
    });
    conn.on('reconnectedFailed', () => {
        console.error(`Mongoose: DB Connection Lost, retries failed`);
    });
    yield (0, mongoose_1.connect)(connectionUrl, {
        autoIndex: true
    });
});
exports.initMongoose = initMongoose;
