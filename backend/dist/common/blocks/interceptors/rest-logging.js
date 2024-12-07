"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_1 = require("../../../logger");
class RestLoggingInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const traceId = (0, logger_1.setTraceId)(request.header("X-Request-Id"));
        context.switchToHttp().getResponse().set("X-Request-Id", traceId);
        const params = {
            method: request.method,
            url: request.url,
            body: request.body,
        };
        logger_1.default.debug(params, `Request started`);
        const startedAt = process.hrtime.bigint();
        return next.handle().pipe((0, operators_1.catchError)((err) => {
            if (err instanceof common_1.HttpException) {
                const status = err.getStatus();
                const level = 500 <= status && status <= 599 ? "error" : "debug";
                logger_1.default[level]({ ...params, duration: this.fromStarted(startedAt), err }, `Request finished with error`);
                return (0, rxjs_1.throwError)(() => err);
            }
            logger_1.default.error({ ...params, duration: this.fromStarted(startedAt), err }, `Request finished with error`);
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException(err.message));
        }), (0, operators_1.tap)(() => {
            logger_1.default.debug({ ...params, duration: this.fromStarted(startedAt) }, `Request finished`);
        }));
    }
    fromStarted(startedAt) {
        return (parseFloat((process.hrtime.bigint() - startedAt).toString()) / 10 ** 9);
    }
}
exports.RestLoggingInterceptor = RestLoggingInterceptor;
//# sourceMappingURL=rest-logging.js.map