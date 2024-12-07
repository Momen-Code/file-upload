export declare const generateMessage: (entity: string) => {
    AlreadyExists: string;
    NotFound: string;
    FailedToCreate: string;
    FailedToUpdate: string;
    FailedToDelete: string;
};
export declare const message: {
    USER: {
        NotLoggedIn: string;
        NotVerified: string;
        PASSWORD_NOT_MATCHED: string;
        PASSWORD_RESET_SUCCESS: string;
        INVALID_USER: string;
        SUSPENDED: string;
        PLEASE_CHANGE_PASSWORD: string;
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    OTP: {
        SEND_SUCCESS: string;
        INVALID: string;
        SUCCESS: string;
    };
    MAIL: {
        SEND_SUCCESS: string;
        FAILEd: string;
    };
    PHONE: {
        PHONE_IS_VERIFIED: string;
    };
    POST: {
        IS_IN_STACK: string;
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    MONGO_ID_VALIDATION_PIPE: (key: string) => string;
    FAVORITE: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    POLICY: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    FEEDBACK: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    SECTION: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    REQUEST: {
        InvalidCustomerRequest: string;
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    REVIEW: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    EVENT: {
        InvalidDate: string;
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    MESSAGE: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    WS_TOKEN: {
        WS_TOKEN_ERROR: string;
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    SESSIONS: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
        ONGOING_SESSION: string;
    };
    NOTIFICATIONS: {
        NOTIFICATION_SENT: string;
        SCHEDULE_NOTIFICATION: string;
        INVALID_SCHEDULE_DATE: string;
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
        NEW_DEAL_TITLE: string;
        NEW_VISIT_TITLE: string;
        REQUEST_UPDATED_TITLE: string;
        NEW_MESSAGE_TITLE: string;
        NEW_ORDER_DETAILS_TITLE: string;
        VENDOR: {
            NEW_REQUEST_DEAL: (reqNo: any, customerName: any) => string;
            NEW_REQUEST_DEAL_ARABIC: (reqNo: any, customerName: any) => string;
            NEW_REQUEST_VISIT: (reqNo: any, customerName: any) => string;
            NEW_REQUEST_VISIT_ARABIC: (reqNo: any, customerName: any) => string;
            REQUEST_UPDATED: (reqNo: any, customerName: any, status: any) => string;
            REQUEST_UPDATED_ARABIC: (reqNo: any, customerName: any, status: any) => string;
            NEW_MESSAGE: (customerName: any) => string;
            NEW_MESSAGE_ARABIC: (customerName: any) => string;
            VISIT_TO_DEAL: (reqNo: any, customerName: any) => string;
        };
        CUSTOMER: {
            NEW_REQUEST_DEAL: (reqNo: any, vendorName: any, vendorType: any) => string;
            NEW_REQUEST_DEAL_ARABIC: (reqNo: any, vendorName: any, vendorType: any) => string;
            NEW_REQUEST_VISIT: (reqNo: any, vendorName: any, vendorType: any) => string;
            NEW_REQUEST_VISIT_ARABIC: (reqNo: any, vendorName: any, vendorType: any) => string;
            REQUEST_UPDATED: (reqNo: any, vendorName: any, vendorType: any, status: any) => string;
            REQUEST_UPDATED_ARABIC: (reqNo: any, vendorName: any, vendorType: any, status: any) => string;
            NEW_MESSAGE: (vendorName: any) => string;
            NEW_MESSAGE_ARABIC: (vendorName: any) => string;
            VISIT_TO_DEAL: (reqNo: any, vendorName: any, vendorType: any) => string;
            NEW_ORDER_DETAILS: (reqNo: any, vendorName: any, vendorType: any) => string;
        };
    };
    IMAGE: {
        BEFORE_AFTER_IMAGES: string;
        NO_FILE: string;
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
        UPLOAD_SUCCESS: string;
        DELETE_SUCCESS: string;
        DELETE_FAILED: string;
    };
    STACK: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    CONVERSATION: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
    COMPLAINT: {
        AlreadyExists: string;
        NotFound: string;
        FailedToCreate: string;
        FailedToUpdate: string;
        FailedToDelete: string;
    };
};
