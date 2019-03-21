
// @ts-ignore
import {findUser, addUser} from '../Services/User'


// @ts-ignore
export const userResolver = (_, {id}) => {
    // @ts-ignore
    return findUser(id);
};

// @ts-ignore
export const addUserResolver = (_, {name, email}) => {
    // @ts-ignore
    return addUser(name, email);
};