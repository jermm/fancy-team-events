import React, {Component} from 'react';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {userName:'' , email:''};
        this.userNameChange = this.userNameChange.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
    }

    userNameChange(e){
        this.setState({
            userName = e.target.value;
        });
    }

    emailOnChange(e){

    }

    render() {
     return (
         <>
            <header>
                I am the logo
            </header>
            <div>
                <input type='text' id='userName' onChange={this.userNameChange} />
                <input type ='text' id ='Email' onchange={this.emailOnChange} />
                <button id='Login' value='Login' />
            </div>
         </>
     )   
    }
}

export default Login;