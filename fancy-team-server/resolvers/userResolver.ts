
import {findUser, addUser, findUsers, userObject} from '../Services/User'
import {User} from "../entity/User";

interface inputForUser {
    id: number
}

interface inputForAddingUser {
    firstName: string,
    lastName: string,
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
                return addUser(inputObject.firstName, inputObject.lastName, inputObject.email);
            }
        }
    }

};

