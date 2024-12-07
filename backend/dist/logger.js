"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = exports.setTraceId = void 0;
const async_hooks_1 = require("async_hooks");
const crypto_1 = require("crypto");
const pino_1 = require("pino");
const envs_1 = require("./config/envs");
const asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
function setTraceId(requestId) {
    const traceId = requestId || (0, crypto_1.randomBytes)(16).toString("hex");
    asyncLocalStorage.enterWith(traceId);
    return traceId;
}
exports.setTraceId = setTraceId;
const prettyConfig = {
    colorize: true,
    levelFirst: true,
    ignore: "serviceContext",
    translateTime: "SYS:HH:MM:ss.l",
};
const options = {
    level: (0, envs_1.default)()["logLevel"],
    base: {
        serviceContext: {
            service: (0, envs_1.default)()["applicationName"],
            version: (0, envs_1.default)()["version"],
        },
    },
    redact: {
        paths: ["pid", "hostname", "body.password"],
        remove: true,
    },
    transport: {
        target: "pino-pretty",
        options: prettyConfig,
    },
};
const stdout = (0, pino_1.default)(options);
const stderr = (0, pino_1.default)(options, (0, pino_1.destination)(2));
const logger = {
    trace: stdout.trace.bind(stdout),
    debug: stdout.debug.bind(stdout),
    info: stdout.info.bind(stdout),
    warn: stdout.warn.bind(stdout),
    error: stderr.error.bind(stderr),
    fatal: stderr.fatal.bind(stderr),
};
exports.default = logger;
class LoggerService {
    error(message, trace, context) {
        logger.error({
            err: {
                message,
                stack: trace,
                context,
            },
        });
    }
    warn(message) {
        logger.warn(message);
    }
    log(message) {
        logger.info(message);
    }
    debug(message) {
        logger.debug(message);
    }
    verbose(message) {
        logger.trace(message);
    }
}
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.js.map