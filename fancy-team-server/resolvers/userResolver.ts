
// @ts-ignore
import {findUser} from '../Services/User'


// @ts-ignore
export const findUserResolver = (_, {id}) => {
    // @ts-ignore
    return findUser(id);
};