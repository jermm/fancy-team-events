import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';
import Handle404 from './components/404/view';

import store from './Redux/store';

function Routes(){
    return (
        <Provider store={store}>
          <Router>
              <Route exact path='/' component={App} />
              <Route component={ Handle404 } />
          </Router>
        </Provider>
    )
}

export default Routes;
