"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFastifyRoute = exports.RouteMethod = void 0;
var RouteMethod;
(function (RouteMethod) {
    RouteMethod["GET"] = "GET";
    RouteMethod["POST"] = "POST";
    RouteMethod["PUT"] = "PUT";
    RouteMethod["DELETE"] = "DELETE";
    RouteMethod["PATCH"] = "PATCH";
    RouteMethod["HEAD"] = "HEAD";
    RouteMethod["OPTIONS"] = "OPTIONS";
})(RouteMethod = exports.RouteMethod || (exports.RouteMethod = {}));
const makeFastifyRoute = (method, url, handler) => {
    return {
        method,
        url,
        handler
    };
};
exports.makeFastifyRoute = makeFastifyRoute;
