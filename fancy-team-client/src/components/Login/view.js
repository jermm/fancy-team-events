import React, {Component} from 'react';
import './login.scss';
import { withAuth } from '@okta/okta-react';

import {
  Redirect,
} from "react-router-dom";

import {checkAuthentication} from '../../util/helpers';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: null, userinfo: null};
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
    // if(this.props.auth.isAuthenticated()){
    //   console.log(this.props.auth.isAuthenticated());
    //   return <Redirect to='/event'/>;
    // }
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    debugger;
    this.props.auth.login('/event');
  }

  render() {
    if(this.state.authenticated){
      return <Redirect to='/event' />;
    }else{
      return (
          <>
            <section id='Empty-Color'/>
            <section id='Login'>
              <header>
                I am the logo
              </header>
              <button className='LoginBtn' onClick={this.login}>Login</button>
            </section>
          </>
      );
    }
  }
}

export default withAuth(Login);
