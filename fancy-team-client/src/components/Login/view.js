import React, {Component} from 'react';
import Config from '../../config';
import './login.scss';
import {connect} from 'react-redux';

class Login extends Component{

  loginButtonClick(e){
    window.location = Config.clientRedirection;
  }

  // We need to set state indicating that the user is logged in.
  // So that In case the user visits the login page we automatically redirect to the /events page
  render(){
    return (
        <>
          <section id='Empty-Color' />
          <section id='Login'>
            <header>
              I am the logo
            </header>
            <button className='LoginBtn' onClick={this.loginButtonClick}>Login</button>
          </section>
        </>
    );
  }

}

const mapStateToProps = state => ({
  // Read the state variables here
});

export default connect(mapStateToProps)(Login);