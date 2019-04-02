import React, {Component} from 'react';
import {withAuth} from '@okta/okta-react';
import Form from '../Forms/view';
import Header from '../Header/header';
import {getEventById} from "../../services/events";
import {updateEventById} from "../../services/events";

class EventView extends Component {
    constructor(props) {
        super(props);
        this.state = {event: {
                title:'',
                eventDate:'',
                description:'',
                startTime:'',
                endTime:'',
                location:'',
                eventType:'SelectEvent'
            },
            eventId: Number(this.props.match.params.id),
            enableReinitialize: false,
            accessToken:''
        };
    }

    // editEventCallback() {
    //     const {accessToken, eventId} = this.state;
    //     return(async function editEventFnCallback(event, action){
    //         await updateEventById(accessToken, eventId, event);
    //     });
    // }

    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        const fetchEventById = await getEventById(token, this.state.eventId);
        this.setState({
            event: fetchEventById.event,
            enableReinitialize: true,
            accessToken:token
        });
    }

    render() {

        return (
            <div className='event-container'>
                <Header/>
                <EventView
                    event={this.state.event}
                />
                <hr className='event-separator'/>

                <h1>Transportation</h1>
                <div className='event-field'>
                    <span className='event-field-key'> {key}:</span>:
                    <span className='event-field-value'>{value}</span>
                </div>

                <div className='event-field'>
                    <span className='event-field-key'>Parking</span>:
                    <span className='event-field-value'>free</span>
                </div>
                <div className='event-field'>
                    <span className='event-field-key'>Carpool:</span>:
                    <span className='event-field-value'>{value}</span>
                </div>
            </div>
        );
    }
}

export default withAuth(EventView);
