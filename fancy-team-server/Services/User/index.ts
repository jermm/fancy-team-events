import { Client } from 'pg';
const client = new Client();
client.connect();

const getUserQuery = "select id, email, name from users where id=$1";
const addUserQuery = "insert into users (name, email) values ($1, $2) RETURNING id, name, email;";
const getAllUserQuery = "select id, email, name from users;";


export interface userObject {
    id: Number,
    email: String,
    name: String

}

export const findUser = (id: Number) => {
    return client.query(getUserQuery, [id]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    })
};

export const findUsers = function (): Promise<[userObject]> {
    return client.query(getAllUserQuery).then(res => {
        let userArray: [userObject];
        // @ts-ignore
        userArray = res.rows;
        return userArray
    })
};


export const addUser = (name: String, email: String) => {
    return client.query(addUserQuery, [name, email]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    })
};