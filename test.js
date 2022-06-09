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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
require("reflect-metadata");
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
var express = require("express");
var logger_1 = require("./utils/logger/logger");
var routes_1 = require("./routes");
var http = require("http");
var errorHandler_1 = require("./middleware/errorHandler");
var log4js_1 = require("log4js");
var typeorm_1 = require("typeorm");
var database_1 = require("./config/database");
var PORT = 3000;
(0, typeorm_1.createConnection)(database_1["default"]).then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app, swaggerDefinition, options, swaggerSpec;
    return __generator(this, function (_a) {
        console.log("執行中");
        app = express();
        // Logger module for http request/response
        app.use((0, log4js_1.connectLogger)(logger_1["default"], {
            level: 'auto',
            format: function (req, res, format) { return format(":remote-addr :method[:status][:response-timems] :url ".concat(JSON.stringify(req.body))); },
            nolog: '/\.(gif|jpe?g|png)$/'
        }));
        routes_1.AppRoutes.forEach(function (route) {
            app[route.method].apply(app, __spreadArray([route.path], route.middlewares, false));
        });
        app.use(errorHandler_1["default"]);
        swaggerDefinition = {
            info: {
                title: 'REST API for my App',
                version: '1.0.0',
                description: 'This is the REST API for my product'
            },
            host: 'localhost:' + PORT,
            basePath: '/',
            securityDefinitions: {
                APIKeyHeader: {
                    type: 'apiKey',
                    "in": 'header',
                    name: 'authorization'
                }
            },
            security: {
                APIKeyHeader: []
            }
        };
        options = {
            // import swaggerDefinitions
            swaggerDefinition: swaggerDefinition,
            // path to the API docs
            apis: ['./docs/**/*.yaml']
        };
        swaggerSpec = swaggerJSDoc(options);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        http.createServer(app).listen(PORT, function () {
            // if (error) {
            //   logger.error(error);
            //   return process.exit(1);
            // } else {
            logger_1["default"].info('Listening on port: ' + PORT + '.');
            // }
        });
        return [2 /*return*/];
    });
}); })["catch"](function (error) { logger_1["default"].error(error); });
