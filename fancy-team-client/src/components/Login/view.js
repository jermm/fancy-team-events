import React, {Component} from 'react';
import './login.scss';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../../util/helpers';
import Header from '../Header/header';

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {authenticated: null, userinfo: null};
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/event');
  }

  render() {
        return (
        <>
            <section id='Empty-Color' />
                <section id='Login'>
                <Header />
                <button className='LoginBtn' onClick={this.login}>Login</button>
            </section>
        </>
        );
  }
}

export default withAuth(Login);
