import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
declare const DashboardStrategy_base: new (...args: any[]) => Strategy;
export declare class DashboardStrategy extends DashboardStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        _id: any;
        phoneNumber: any;
        type: any;
        name: any;
    }>;
}
export {};
