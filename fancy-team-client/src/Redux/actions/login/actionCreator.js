import {
  Update_UserName ,
  Update_Email
} from './actions'

/*
* Returns Object
*/
export function udpateUserName (userName) {
  return {
    type:Update_UserName,
    payload: userName
  }
}


/*
* Returns Object
*/
export function udpateEmail (email) {
  return {
    type:Update_Email,
    payload: email
  }
}