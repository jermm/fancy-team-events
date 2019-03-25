import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import './login.scss';
import { checkAuthentication } from '../../util/helpers';

export default withAuth(class Login extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = { authenticated: null, userinfo: null };
        this.checkAuthentication = checkAuthentication.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        this.props.auth.login('/');
    }

    render() {
        return (
   <>
            <section id='Empty-Color' />
            <section id='Login'>
            <header>
            I am the logo
        </header>
        <button className='LoginBtn' onClick={this.login}>Login</button>
            </section>
</>
    );
    }
});
