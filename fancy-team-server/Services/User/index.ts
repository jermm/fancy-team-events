import { Client } from 'pg';
import {User} from "../../entity/User";


const client = new Client();
client.connect();

import {getConnection} from "typeorm";


export class UserService {

    /**
     *
     * @param id
     */
    public static async findUser(id: number):Promise<any> {
        try {
            const userRepository = getConnection().getRepository(User);
            return await userRepository.findOne({id});
        }
        catch(error) {
            console.log(error);
            throw error;
        }
    }

    /**
     *
     * @param
     */
    public static async findUserByEmail(email: string):Promise<any> {
        try {
            const userRepository = getConnection().getRepository(User);
            return await userRepository.findOne({email});
        }
        catch(error) {
            console.log(error);
            throw error;
        }
    }

    /**
     *
     */
    public static async findUsers(): Promise<any> {
        const userRepository = getConnection().getRepository(User);
        return userRepository.find()

    }

    /**
     * addUser
     *
     * @param email
     * @param oAuthId
     */
    public static async addUser(email: string, oAuthId: string): Promise<any> {
        try {
            const userRepository = getConnection().getRepository(User);
            let userEntity = new User();
            userEntity.email = email;
            userEntity.oAuthId = oAuthId;
            await userRepository.save(userEntity);
            return await userRepository.findOne({email, oAuthId});
        }
        catch (error) {
            // log error
            throw error;
        }
    }

}
