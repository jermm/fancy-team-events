"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const User_1 = require("../../entity/User");
const client = new pg_1.Client();
client.connect();
const getUserQuery = "select id, email, name from users where id=$1";
const addUserQuery = "insert into users (name, email) values ($1, $2) RETURNING id, name, email;";
const getAllUserQuery = "select id, email, name from users;";
const typeorm_1 = require("typeorm");
const user = new User_1.User();
exports.findUser = (id) => {
    const userRepository = typeorm_1.getConnection().getRepository(User_1.User);
    return userRepository.findOne({ id: id }).then((result) => {
        return result;
    }).catch((e) => {
        console.log(e);
    });
};
exports.findUsers = function () {
    const userRepository = typeorm_1.getConnection().getRepository(User_1.User);
    return userRepository.find();
};
exports.addUser = (name, email) => {
    const userRepository = typeorm_1.getConnection().getRepository(User_1.User);
    const user = new User_1.User();
    user.email = email;
    user.name = name;
    return userRepository.save(user).then(() => {
        return userRepository.findOne({ email: email });
    });
};
//# sourceMappingURL=index.js.map