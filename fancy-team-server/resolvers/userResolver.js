"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../Services/User");
exports.userResolver = {
    Query: {
        user: {
            resolve(_, inputObject) {
                return User_1.findUser(inputObject.id);
            }
        },
        users: {
            resolve(_) {
                return User_1.findUsers();
            }
        }
    },
    Mutation: {
        addUser: {
            resolve(_, inputObject) {
                return User_1.addUser(inputObject.name, inputObject.email);
            }
        }
    }
};
// export const userResolver = function (_: any, inputObject: inputForUser): Promise<userObject> {
// //     return findUser(inputObject.id);
// // };
// //
// // export const addUserResolver = (_: any, inputObject: inputForAddingUser ) => {
// //     return addUser(inputObject.name, inputObject.email);
// // };
//# sourceMappingURL=userResolver.js.map