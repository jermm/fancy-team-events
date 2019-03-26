import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login/view'
import Profile from './components/Profile/view';
import Events from './components/Events/view';
import Handle404 from './components/404/view';
import CreateEvent from './components/CreateEvent/view';
import { Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
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
              <Route exact path='/events/create' component={ CreateEvent } />
              <Route path="/implicit/callback" component={ ImplicitCallback } />
              <SecureRoute path="/profile" component= { Profile } />
              <SecureRoute path="/events" component= { Events } />
              <Route component={ Handle404 } />
              </Switch>
              </Security>
          </Router>
        </Provider>
    )
}

export default Routes;
