import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login/view';
import Event from './components/Event/event';
import Handle404 from './components/404/view';

import store from './Redux/store';

function Routes(){
    return (
        <Provider store={store}>
          <Router>
          <Switch>
              <Route exact path='/' component={ App } />
              <Route exact path='/login' component={ Login } />
              <Route exact path='/event' component={ Event } />
              <Route component={ Handle404 } />
          </Switch>
          </Router>
        </Provider>
    )
}

export default Routes;
