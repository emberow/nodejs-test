"use strict";
exports.__esModule = true;
var resolveFilePath = function (folderName) {
    return process.env.NODE_ENV === 'production' ? "out/".concat(folderName, "/*.js") : "src/".concat(folderName, "/*.ts");
};
var dbconfig = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "32865417",
    database: "keepAccounts",
    migrationsRun: false,
    synchronize: false,
    logging: ['error'],
    maxQueryExecutionTime: 5000,
    entities: [
        resolveFilePath('entity'),
    ]
};
exports["default"] = dbconfig;
