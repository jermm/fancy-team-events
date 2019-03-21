const initialState = {
  userName: '',
  email: ''
};

export default function LoginReducer(state = initialState, action) {
    switch(action.type){
      case 'Update_UserName':
        return Object.assign({},state, action.payload);
      case 'Update_Email':
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
}
