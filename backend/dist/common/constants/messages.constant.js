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
        ...(0, exports.generateMessage)("User"),
        NotLoggedIn: "User not logged in!",
        INVALID_USER: "Invalid user",
    },
};
//# sourceMappingURL=messages.constant.js.map