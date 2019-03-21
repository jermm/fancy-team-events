"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const User_1 = require("../Services/User");
// @ts-ignore
exports.userResolver = (_, { id }) => {
    // @ts-ignore
    return User_1.findUser(id);
};
// @ts-ignore
exports.addUserResolver = (_, { name, email }) => {
    // @ts-ignore
    return User_1.addUser(name, email);
};
//# sourceMappingURL=userResolver.js.map