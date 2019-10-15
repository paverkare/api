"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_router_1 = __importDefault(require("./test.router"));
var Router = /** @class */ (function () {
    function Router() {
        this.router = express_1.default.Router();
        this.build();
    }
    Router.prototype.build = function () {
        this.router.use('/test', test_router_1.default);
    };
    return Router;
}());
exports.default = new Router().router;
