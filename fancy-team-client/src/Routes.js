import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './App';

import Login from './components/Login/view'
// import Profile from './components/Profile/view';
import EventList from './components/Events/EventList';
import Handle404 from './components/404/view';
import { Security, ImplicitCallback} from '@okta/okta-react';
import config from './config';
import store from './Redux/store';

function Routes(){
    return (
        <Provider store={store}>
          <Router>
              <Security
                  issuer={config.oidc.issuer}
                  client_id={config.oidc.clientId}
                  redirect_uri={config.oidc.redirectUri}
              >
            <Switch>
              <Route exact path='/' component={ App } />
              <Route exact path='/login' component={ Login } />
              <Route exact path="/implicit/callback" component={ ImplicitCallback } />
              <Route exact path="/event" component= { EventList } />
              <Route component={ Handle404 } />
            </Switch>
              </Security>
          </Router>
        </Provider>
    )
}

export default Routes;
