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
  }

  async login() {
    console.log('I am getting execited');
    console.log(this.props);
    this.props.auth.login('/');
  }

  render() {
    if(this.props.auth.isAuthenticated()){
      return <Redirect to='/event'/>
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
