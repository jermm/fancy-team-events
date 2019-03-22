import { combineReducers } from "redux";
import loginReducer from './login';

/*
* App aggregates all your reducers
* */
const App = combineReducers({
  loginReducer
});


export default App;
