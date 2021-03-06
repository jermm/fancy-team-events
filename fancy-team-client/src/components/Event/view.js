import React, {Component} from 'react';
import {withAuth} from '@okta/okta-react';
import EventInfo from './EventView';
import Header from '../Header/header';
import './event.scss';

import {getStopsFromId} from '../../services/getTransitStops'

import {updateInvite, getInvite, getEventById} from "../../services/events";
import Script from "react-load-script";
import config from "../../config";

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
            transitStops: [],
            eventId: Number(this.props.match.params.id),
            enableReinitialize: false,
            accessToken: ''
        };
        this.eventFound = false;
        this.scriptLoaded = false;
        this.transitLoaded = false;
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
    }

    attendInviteCallBack(accessToken, eventId) {
        return (async function updateInviteCallback(isAttending) {
            await updateInvite(accessToken, eventId, isAttending);
            this.setState({isAttending: isAttending});
        }.bind(this));
    }

    selecttshirtInviteCallBack(accessToken, eventId) {
        return (async function updateInviteCallback(tShirtSize) {
            await updateInvite(accessToken, eventId, this.state.isAttending, tShirtSize);
            this.setState({tShirtSize: tShirtSize});
        }.bind(this));
    }


    handleScriptLoad() {
        if (this.eventFound && !this.transitLoaded) {
            const that = this;
            this.transitLoaded = true;
            getStopsFromId(this.state.event.locationId).then(function (result) {
                that.setState({transitStops: result})
            });
        }
        this.scriptLoaded = true;
    }


    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        const fetchInviteBy = await getInvite(token, this.state.eventId);
        const fetchEventById = await getEventById(token, this.state.eventId);
        let isAttending = false;
        let tShirtSize = '';

        if (fetchEventById && fetchInviteBy.inviteForEvent) {
            isAttending = fetchInviteBy.inviteForEvent.isAttending;
            tShirtSize = fetchInviteBy.inviteForEvent.tShirtSize;
        }

        this.setState({
            isAttending: isAttending,
            tShirtSize: tShirtSize,
            event: fetchEventById.event,
            enableReinitialize: true,
            accessToken: token
        });
        if (this.scriptLoaded && !this.transitLoaded) {
            const that = this;
            this.transitLoaded = true;
            getStopsFromId(this.state.event.locationId).then(function (result) {
                that.setState({transitStops: result})
            });
        }
        this.eventFound = true;
    }

    render() {
        let transitStopString = '';
        this.state.transitStops.forEach(function (stop) {
            transitStopString = transitStopString + stop + ", ";
        });

        return (
            <div className='event-container'>
                <Script
                    url={config.googleAutoCompleteURL}
                    onLoad={this.handleScriptLoad}
                />
                <div className='event-container-header'>
                    <Header/>
                </div>
                <div className='event-container-right'>
                    <EventInfo
                        event={this.state.event} isAttending={this.state.isAttending} tShirtSize={this.state.tShirtSize}
                        handleEventInvite={this.attendInviteCallBack(this.state.accessToken, this.state.eventId)}
                        handleSelect={this.selecttshirtInviteCallBack(this.state.accessToken, this.state.eventId)}
                    />

                    <div className='event-form-container'>
                        <hr className='event-separator'/>

                        <h3>Transportation</h3>

                        <p>Nearby Transit: {transitStopString}</p>

                        {/* <div className='event-field'>
                            <span className='event-field-key'>Parking:</span>
                            <span className='event-field-value'>free</span>
                        </div>
                        <div className='event-field'>
                            <span className='event-field-key'>Carpool:</span>:
                            <span className='event-field-value event-switch'></span>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(EventView);
