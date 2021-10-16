"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
var Metadatakeys_1 = require("./Metadatakeys");
function use(middleware) {
    return function (target, key, desc) {
        var middlewares = Reflect.getMetadata(Metadatakeys_1.MetadataKeys.Middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(Metadatakeys_1.MetadataKeys.Middleware, middlewares, target, key);
    };
}
exports.use = use;
