
import {findUser, addUser, userObject} from '../Services/User'

interface inputForUser {
    id: Number
}

interface inputForAddingUser {
    name: String,
    email: String
}

export const userResolver = {
    Query: {
        user: {
            resolve(_: any, inputObject: inputForUser): Promise<userObject> {
                return findUser(inputObject.id);
            }
        }

    },
    Mutation: {
        addUser: {
            resolve(_: any, inputObject: inputForAddingUser ): any {
                return addUser(inputObject.name, inputObject.email);
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