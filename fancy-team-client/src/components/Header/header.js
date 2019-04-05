import React , {Component} from 'react';
import EventLogo from "./calendar-events-svgrepo-com.svg";
import './header.scss';
import { withAuth } from '@okta/okta-react';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {userInfo:null, showUserName:false}
  }

  async componentDidMount(){
    let userInfo = await this.props.auth.getUser();
    if(this.props.auth._history.location.pathname === '/'){
      this.setState({
        showUserName:false
      });
    }else{
      this.setState({
        userInfo:userInfo.given_name,
        showUserName:true
      })
    }
  }

  render(){
    const userName = <div>Hi {this.state.userInfo}</div>;
    return (
        <div>
          <header className="event-header">
            <img src={EventLogo} className="event-logo" alt="Event header logo" width="200" height="300" />
            <h1 className='event-title'>Fancy Event Organizer</h1>
            {this.state.showUserName ? userName : null}
          </header>
        </div>
    )
  }

}

export default withAuth(Header);