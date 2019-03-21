import { Client } from 'pg';
const client = new Client();
client.connect();

const getUserQuery = "select id, email, name from users where id=$1";
const addUserQuery = "insert into users (name, email) values ($1, $2) RETURNING id, name, email;";

// @ts-ignore
export const findUser = (id) => {
    return client.query(getUserQuery, [id]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    })
};

// @ts-ignore
export const addUser = (name, email) => {
    return client.query(addUserQuery, [name, email]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    })
}