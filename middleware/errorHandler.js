"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CommonError = exports.UserError = void 0;
var logger_1 = require("../utils/logger/logger");
var errorHandler = function (err, req, res, next) {
    if (err instanceof UserError) {
        res.status(401).json({
            message: err.message
        });
    }
    else if (err instanceof CommonError) {
        logger_1["default"].error("COMMON - ".concat(err.message));
        res.status(400).json(err.message);
    }
    else {
        res.status(500).json({ message: 'SYSTEM_ERROR' });
    }
};
exports["default"] = errorHandler;
var UserError = /** @class */ (function (_super) {
    __extends(UserError, _super);
    function UserError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    return UserError;
}(Error));
exports.UserError = UserError;
var CommonError = /** @class */ (function (_super) {
    __extends(CommonError, _super);
    function CommonError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    return CommonError;
}(Error));
exports.CommonError = CommonError;
