"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    applicationName: "FileUpload",
    version: process.env.VERSION || "latest",
    env: process.env.ENV_NAME,
    NODE_ENV: "local",
    logLevel: "debug",
    port: parseInt(process.env.PORT, 10) || 8000,
    baseUrl: process.env.BASE_URL,
    database: {
        url: process.env.DATABASE_URL,
    },
    access: {
        USER_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY_USER,
        USER_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY_USER,
        ADMIN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY_ADMIN,
        ADMIN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY_ADMIN,
    },
    redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
});
//# sourceMappingURL=local.config.js.map