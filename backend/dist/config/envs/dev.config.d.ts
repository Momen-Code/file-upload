declare const _default: () => {
    applicationName: string;
    version: string;
    env: string;
    NODE_ENV: string;
    logLevel: string;
    port: number;
    baseUrl: string;
    database: {
        url: string;
    };
    access: {
        USER_PUBLIC_KEY: string;
        USER_PRIVATE_KEY: string;
        ADMIN_PUBLIC_KEY: string;
        ADMIN_PRIVATE_KEY: string;
    };
    redis: {
        host: string;
        password: string;
    };
};
export default _default;
