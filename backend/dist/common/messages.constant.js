"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.generateMessage = void 0;
const generateMessage = (entity) => ({
    AlreadyExists: `${entity} already exists!`,
    NotFound: `${entity} not found!`,
    FailedToCreate: `Failed to create ${entity}!`,
    FailedToUpdate: `Failed to update ${entity}!`,
    FailedToDelete: `Failed to delete ${entity}!`,
});
exports.generateMessage = generateMessage;
exports.message = {
    USER: {
        ...(0, exports.generateMessage)('User'),
        NotLoggedIn: 'User not logged in!',
        NotVerified: 'Account is not verified yet!',
        PASSWORD_NOT_MATCHED: 'Password did not match',
        PASSWORD_RESET_SUCCESS: 'Password reset successfully',
        INVALID_USER: 'Invalid user',
        SUSPENDED: 'User is suspended by admin please contact support',
        PLEASE_CHANGE_PASSWORD: 'Please change your password ,check your email',
    },
    OTP: {
        SEND_SUCCESS: 'OTP Sent Successfully!',
        INVALID: 'Invalid OTP!',
        SUCCESS: 'OTP verified successfully!',
    },
    MAIL: {
        SEND_SUCCESS: 'Email sent successfully, check your inbox',
        FAILEd: 'Failed to send email, please try again! ',
    },
    PHONE: {
        PHONE_IS_VERIFIED: 'Phone number is already verified!',
    },
    POST: {
        ...(0, exports.generateMessage)('Post'),
        IS_IN_STACK: "Can't delete this post because it is in the stack",
    },
    MONGO_ID_VALIDATION_PIPE: (key) => `Invalid ${key}!`,
    FAVORITE: {
        ...(0, exports.generateMessage)('Favorite'),
    },
    POLICY: {
        ...(0, exports.generateMessage)('Policy'),
    },
    FEEDBACK: {
        ...(0, exports.generateMessage)('Feedback'),
    },
    SECTION: {
        ...(0, exports.generateMessage)('Section'),
    },
    REQUEST: {
        ...(0, exports.generateMessage)('Request'),
        InvalidCustomerRequest: 'Sorry, your not a customer for this request',
    },
    REVIEW: {
        ...(0, exports.generateMessage)('Review'),
    },
    EVENT: {
        ...(0, exports.generateMessage)('Event'),
        InvalidDate: 'The end date must be after or equal to the start date.',
    },
    MESSAGE: {
        ...(0, exports.generateMessage)('Message'),
    },
    WS_TOKEN: {
        ...(0, exports.generateMessage)('Websocket Token'),
        WS_TOKEN_ERROR: 'Invalid Websocket Token!',
    },
    SESSIONS: {
        ONGOING_SESSION: 'You already have an ongoing session!',
        ...(0, exports.generateMessage)('Session'),
    },
    NOTIFICATIONS: {
        NEW_DEAL_TITLE: 'New Deal',
        NEW_VISIT_TITLE: 'New Visit',
        REQUEST_UPDATED_TITLE: 'Request Updated',
        NEW_MESSAGE_TITLE: 'New Message',
        NEW_ORDER_DETAILS_TITLE: 'Order Details',
        VENDOR: {
            NEW_REQUEST_DEAL: (reqNo, customerName) => `You have a new request ${reqNo} From ${customerName}`,
            NEW_REQUEST_DEAL_ARABIC: (reqNo, customerName) => `لديك طلب جديد ${reqNo} من ${customerName}`,
            NEW_REQUEST_VISIT: (reqNo, customerName) => `You have a new visit request ${reqNo} From ${customerName}`,
            NEW_REQUEST_VISIT_ARABIC: (reqNo, customerName) => `لديك طلب زيارة جديد ${reqNo} من ${customerName}`,
            REQUEST_UPDATED: (reqNo, customerName, status) => `Request ${reqNo} WITH ${customerName} status has been updated to ${status}`,
            REQUEST_UPDATED_ARABIC: (reqNo, customerName, status) => `تم تحديث طلب ${reqNo} من ${customerName} إلى ${status}`,
            NEW_MESSAGE: (customerName) => `You have a new message from ${customerName}`,
            NEW_MESSAGE_ARABIC: (customerName) => `لديك رسالة جديدة من ${customerName}`,
            VISIT_TO_DEAL: (reqNo, customerName) => `Your visit request ${reqNo} with ${customerName} has progressed to deal`,
        },
        CUSTOMER: {
            NEW_REQUEST_DEAL: (reqNo, vendorName, vendorType) => `Your request ${reqNo} with ${vendorType}: ${vendorName} has been created`,
            NEW_REQUEST_DEAL_ARABIC: (reqNo, vendorName, vendorType) => `تم إنشاء طلبك ${reqNo} مع ${vendorType}: ${vendorName}`,
            NEW_REQUEST_VISIT: (reqNo, vendorName, vendorType) => `Your visit request ${reqNo} with ${vendorType}: ${vendorName} has been created`,
            NEW_REQUEST_VISIT_ARABIC: (reqNo, vendorName, vendorType) => `تم إنشاء طلب الزيارة ${reqNo} مع ${vendorType}: ${vendorName}`,
            REQUEST_UPDATED: (reqNo, vendorName, vendorType, status) => `Your request ${reqNo} with ${vendorType}:${vendorName} status has been updated to ${status}`,
            REQUEST_UPDATED_ARABIC: (reqNo, vendorName, vendorType, status) => `تم تحديث طلبك ${reqNo} مع ${vendorType}: ${vendorName} إلى ${status}`,
            NEW_MESSAGE: (vendorName) => `You have a new message from ${vendorName}`,
            NEW_MESSAGE_ARABIC: (vendorName) => `لديك رسالة جديدة من ${vendorName}`,
            VISIT_TO_DEAL: (reqNo, vendorName, vendorType) => `Your visit request ${reqNo} with ${vendorType}: ${vendorName} has progressed to deal`,
            NEW_ORDER_DETAILS: (reqNo, vendorName, vendorType) => `Your request ${reqNo} with ${vendorType}:${vendorName} has been updated with order details`,
        },
        ...(0, exports.generateMessage)('Notification'),
        NOTIFICATION_SENT: 'Notification sent successfully',
        SCHEDULE_NOTIFICATION: 'Notification scheduled successfully',
        INVALID_SCHEDULE_DATE: 'The scheduled time must be in the future.'
    },
    IMAGE: {
        UPLOAD_SUCCESS: 'Image uploaded successfully!',
        DELETE_SUCCESS: 'Image deleted successfully!',
        DELETE_FAILED: 'Failed to delete image!',
        ...(0, exports.generateMessage)('Image'),
        BEFORE_AFTER_IMAGES: 'Before and after images must be equal!',
        NO_FILE: 'No file found!',
    },
    STACK: {
        ...(0, exports.generateMessage)('Stack'),
    },
    CONVERSATION: {
        ...(0, exports.generateMessage)('Conversation'),
    },
    COMPLAINT: {
        ...(0, exports.generateMessage)('Complaint'),
    }
};
//# sourceMappingURL=messages.constant.js.map