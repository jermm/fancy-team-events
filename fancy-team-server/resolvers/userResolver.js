"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const User_1 = require("../Services/User");
// @ts-ignore
exports.findUserResolver = (_, { id }) => {
    // @ts-ignore
    return User_1.findUser(id);
};
//# sourceMappingURL=userResolver.js.map