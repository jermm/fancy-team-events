import { combineReducers } from "redux";
import LoginReducer from './login';

/*
* App aggregates all your reducers
* */
const App = combineReducers({
  LoginReducer
});


export default App;
