"use strict";
exports.__esModule = true;
exports.AppRoutes = void 0;
var AccountController_1 = require("./controller/AccountController");
exports.AppRoutes = [
    {
        path: '',
        method: 'get',
        middlewares: [
            AccountController_1.getName,
            function (req, res, next) {
                console.log("aaaa");
                next();
            },
            function (req, res) {
                res.send("hi");
            },
        ]
    }
];
