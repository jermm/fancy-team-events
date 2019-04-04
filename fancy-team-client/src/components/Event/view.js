import React, {Component} from 'react';
import {withAuth} from '@okta/okta-react';
import EventInfo from './EventView';
import Header from '../Header/header';
import './event.scss';

import {getEventById} from "../../services/events";

class EventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                title: '',
                EventDate: '',
                Description: '',
                StartTime: '',
                EndTime: '',
                Location: '',
                eventType: 'SelectEvent'
            },
            eventId: Number(this.props.match.params.id),
            enableReinitialize: false,
            accessToken: ''
        };
    }


    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        const fetchEventById = await getEventById(token, this.state.eventId);
        this.setState({
            event: fetchEventById.event,
            enableReinitialize: true,
            accessToken: token
        });
    }

    render() {
        console.log(this.state.event);
        return (
            <div className='event-container'>
             {/*//   <aside>*/}

                    <div className='event-list-page-header'>
                        <Header/>
                    </div>
                {/*</aside>*/}
      <div className='event-container-right'>
                <EventInfo
                    event={this.state.event}
                />

                <div className='event-form-container'>
                    <hr className='event-separator'/>

                    <h3>Transportation</h3>
                    {/*<div className='event-field'>*/}
                    {/*<span className='event-field-key'>:</span>:*/}
                    {/*<span className='event-field-value'></span>*/}
                    {/*</div>*/}

                    <div className='event-field'>
                        <span className='event-field-key'>Parking</span>:
                        <span className='event-field-value'>free</span>
                    </div>
                    <div className='event-field'>
                        <span className='event-field-key'>Carpool:</span>:
                        <span className='event-field-value'></span>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default withAuth(EventView);
