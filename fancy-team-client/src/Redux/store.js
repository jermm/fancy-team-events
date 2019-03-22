import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Used for debugging (https://github.com/zalmoxisus/redux-devtools-extension)
import { composeWithDevTools } from "redux-devtools-extension";
import App from './reducers/app';

// Store Accepts the Reducer
const store = createStore(App , composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;
