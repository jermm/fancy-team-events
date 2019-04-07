import React, {Component} from "react";
import {getEventByUser} from "../../services/events";
import {Link} from 'react-router-dom';
import Header from '../Header/header';
import './main.scss';

import {withAuth} from "@okta/okta-react/dist/index";
import EventList from "../Events/EventList";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { events:[]};
    }

    componentDidMount() {
        this.getEvents();
    }

    async getEvents() {
        try {
            const accessToken = await this.props.auth.getAccessToken();
            const response = await getEventByUser(accessToken);
            this.setState({ events:response.eventsByUser, failed: false });
        } catch (err) {
            /* eslint-disable no-console */
            console.error(err);
        }
    }

    render() {
        return (
            <div className='event-container'>
                <div className='event-container-header'>
                <Header/>
                </div>

              <div className='event-container-right'>
                  {this.state.events.length === 0 ? (
                          <div className='event-list-page-main-zero'> <p>Welcome to Fancy Events Organizer ! You have no events so far... Do you want to go ahead and create one ?</p>
                  <Link to="/event/create">
                      <span className='LoginBtn'>Create</span>
                  </Link>
                  </div>)
                  :
                      (<EventList events={this.state.events}></EventList>)
                  }
              </div>
            </div>
        );
    }
}

export default withAuth(Main);