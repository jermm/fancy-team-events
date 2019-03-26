import { Client } from 'pg';
import {User} from "../../entity/User";
const client = new Client();
client.connect();

const getUserQuery = "select id, email, name from users where id=$1";
const addUserQuery = "insert into users (name, email) values ($1, $2) RETURNING id, name, email;";
const getAllUserQuery = "select id, email, name from users;";
import {getConnection, getRepository} from "typeorm";

const user = new User();


export interface userObject {
    id: Number,
    email: String,
    firstName: String,
    lastName: String

}

export const findUser = (id: number):Promise<any> => {
    const userRepository = getConnection().getRepository(User);
    return userRepository.findOne({id: id}).then((result) => {
        return result;
    }).catch((e) => {
        console.log(e);
    })
};

export const findUsers = function (): Promise<any> {

    const userRepository = getConnection().getRepository(User);
    return userRepository.find()

};


export const addUser = (firstName: string,lastName: string, email: string) => {

    const userRepository = getConnection().getRepository(User);
    const user = new User();

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;

    return userRepository.save(user).then(() => {
        return userRepository.findOne({email: email})
    });

};