
import {User} from '../Services/User'
import {UserEntity} from "../entity/User";
import {IAddUserEntity, IUserEntity} from "../common/external";


interface inputForUser {
    id: number
}

export const userResolver = {
    Query: {
        user: {
            resolve(_: any, inputObject: inputForUser): Promise<UserEntity> {
                return User.findUser(inputObject.id);
            }
        },
        users: {
            resolve(_: any): Promise<IUserEntity[]> {
                return User.findUsers();
            }
        }

    },
    Mutation: {
        addUser: {
            resolve(_: any, inputObject: IAddUserEntity): any {
                return User.addUser(inputObject.email, inputObject.oauthId);
            }
        }
    }

};

