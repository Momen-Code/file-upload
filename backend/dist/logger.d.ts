import { LoggerService as LoggerServiceInterface } from "@nestjs/common";
import { Level, Logger } from "pino";
export declare function setTraceId(requestId?: string): string;
declare const logger: Pick<Logger, Level>;
export default logger;
export declare class LoggerService implements LoggerServiceInterface {
    error(message: unknown, trace?: string, context?: string): void;
    warn(message: string): void;
    log(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
