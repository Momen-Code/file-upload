"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local_config_1 = require("./local.config");
const dev_config_1 = require("./dev.config");
const prod_config_1 = require("./prod.config");
const env = process.env.NODE_ENV || 'dev';
const configurations = {
    dev: dev_config_1.default,
    local: local_config_1.default,
    prod: prod_config_1.default,
};
const config = configurations[env];
exports.default = () => config();
//# sourceMappingURL=index.js.map