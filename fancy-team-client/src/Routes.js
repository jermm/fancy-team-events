import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './components/Profile/view';
// import {checkAuthentication} from './util/helpers';

import Login from './components/Login/view'
// import Profile from './components/Profile/view';
import EventList from './components/Events/EventList';
import Handle404 from './components/404/view';
import CreateEvent from "./components/CreateEvent/view";
import { Security,SecureRoute,ImplicitCallback} from '@okta/okta-react';
import config from './config';
import store from './Redux/store';

function Routes (){
  return (
      <Provider store={store}>
        <Router>
          <Security
              issuer={config.oidc.issuer}
              client_id={config.oidc.clientId}
              redirect_uri={config.oidc.redirectUri}
          >
            <Switch>
              <Route exact path='/' component={ Login } />
              <SecureRoute exact path="/event" component= { EventList } />
              <SecureRoute exact path='/event/create' component={ CreateEvent } />
              <SecureRoute exact path="/profile" component= { Profile } />
              <Route exact path="/implicit/callback" component={ ImplicitCallback } />
              <Route component={ Handle404 } />
            </Switch>
          </Security>
        </Router>
      </Provider>
  );
}

export default Routes;
