import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const AdminStrategy_base: new (...args: any[]) => Strategy;
export declare class AdminStrategy extends AdminStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        name: any;
        role: any;
        email: any;
    }>;
}
export {};
