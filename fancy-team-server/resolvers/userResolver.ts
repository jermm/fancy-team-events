
import {findUser, addUser, findUsers, userObject} from '../Services/User'
import {User} from "../entity/User";

interface inputForUser {
    id: number
}

interface inputForAddingUser {
    name: string,
    email: string
}

export const userResolver = {
    Query: {
        user: {
            resolve(_: any, inputObject: inputForUser): Promise<User> {
                return findUser(inputObject.id);
            }
        },
        users: {
            resolve(_: any): Promise<userObject[]> {
                return findUsers();
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
