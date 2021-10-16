"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var Metadatakeys_1 = require("./Metadatakeys");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send('Invalid Request');
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(Metadatakeys_1.MetadataKeys.Path, target.prototype, key);
            var method = Reflect.getMetadata(Metadatakeys_1.MetadataKeys.Method, target.prototype, key);
            var middlewares = Reflect.getMetadata(Metadatakeys_1.MetadataKeys.Middleware, target.prototype, key) ||
                [];
            var requiredBodyProps = Reflect.getMetadata(Metadatakeys_1.MetadataKeys.Validator, target.prototype, key) || [];
            var validator = bodyValidators(requiredBodyProps);
            if (path) {
                router[method].apply(router, __spreadArray(__spreadArray(["" + routePrefix + path], middlewares), [validator, routeHandler]));
            }
        }
    };
}
exports.controller = controller;
