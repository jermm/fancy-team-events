
import {UserService} from '../Services/User'
import {User} from "../entity/User";
import {IAddUserEntity, IUserEntity} from "../common/external";


interface inputForUser {
    id: string
}

export const userResolver = {
    Query: {
        user: {
            resolve(_: any, inputObject: inputForUser): Promise<User> {
                return UserService.findUser(inputObject.id);
            }
        },
        users: {
            resolve(_: any): Promise<IUserEntity[]> {
                return UserService.findUsers();
            }
        }

    },
    Mutation: {
        addUser: {
            resolve(_: any, inputObject: IAddUserEntity): any {
                return UserService.addUser(inputObject.email, inputObject.oauthId);
            }
        }
    }

};

