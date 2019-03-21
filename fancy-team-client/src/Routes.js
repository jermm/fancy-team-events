import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/login/view';

import App from './App';
import store from './Redux/store';

function Routes(){
    return (
        <Provider store={store}>
          <Router>
              <Route exact path='/' component={Login} />
          </Router>
        </Provider>
    )
}

export default Routes;
