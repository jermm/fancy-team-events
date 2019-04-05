import React, {Component} from 'react';
import {withAuth} from '@okta/okta-react';
import EventInfo from './EventView';
import Header from '../Header/header';
import './event.scss';

import {updateInvite, getInvite, getEventById} from "../../services/events";

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

    attendInviteCallBack(accessToken, eventId) {
        return (async function updateInviteCallback(isAttending) {
            await updateInvite(accessToken, eventId, isAttending);
        });
    }

    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        const fetchInviteBy = await getInvite(token, this.state.eventId);
        const fetchEventById = await getEventById(token, this.state.eventId);
        this.setState({
            isAttending: fetchInviteBy.inviteForEvent.isAttending,
            event: fetchEventById.event,
            enableReinitialize: true,
            accessToken: token
        });
    }

    render() {
        return (
            <div className='event-container'>
             {/*//   <aside>*/}

                    <div className='event-list-page-header'>
                        <Header/>
                    </div>
                {/*</aside>*/}
      <div className='event-container-right'>
                <EventInfo
                    event={this.state.event} isAttending={this.state.isAttending}
                    handleEventInvite={this.attendInviteCallBack(this.state.accessToken, this.state.eventId)}
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
