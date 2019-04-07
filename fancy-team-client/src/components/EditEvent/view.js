import React, {Component} from 'react';
import {withAuth} from '@okta/okta-react';
import Form from '../Forms/view';
import Header from '../Header/header';
import {getEventById} from "../../services/events";
import {updateEventById, getInvitees} from "../../services/events";

class EditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formInitialValue: {
                title: '',
                eventDate: '',
                description: '',
                startTime: '',
                endTime: '',
                location: '',
                locationIdCallback: '',
                eventType: 'SelectEvent'
            }, formStartValue: {},
            eventId: Number(this.props.match.params.id),
            enableReinitialize: false,
            accessToken: '',
            invitees: []
        };
        this.locationIdCallback = this.locationIdCallback.bind(this);
        this.editEventCallback = this.editEventCallback.bind(this);

    }

    editEventCallback() {
        const that = this;
        const {accessToken, eventId, formStartValue, locationId} = this.state;
        return (async function editEventFnCallback(event, action) {
            if (locationId) {
                event.locationId = locationId;
            }

            let eventUpdate = await updateEventById(accessToken, eventId, formStartValue, event);
            if (eventUpdate.statusText === "OK") {
                that.props.toastManager.add('The event has been successfully saved to. Please visit Events Page to look at the event', {
                    appearance: 'success',
                    autoDismiss: true
                });
            }
        });
    }

    locationIdCallback(locationId) {
        this.setState({locationId: locationId});
    }

    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        const fetchEventById = await getEventById(token, this.state.eventId);
        const fetchInvitees = await getInvitees(token, this.state.eventId);
        const initValue = fetchEventById.event;
        this.setState({
            formInitialValue: initValue,
            formStartValue: initValue,
            enableReinitialize: true,
            accessToken: token,
            invitees: fetchInvitees.invitees
        });
    }

    render() {
        const {title, eventDate, description, startTime, endTime, locationName, locationId, type, inviteEmails} = this.state.formInitialValue;
        const FormValues = {
            title: title,
            eventDate: eventDate,
            description: description,
            startTime: startTime,
            endTime: endTime,
            type: type,
            locationName: locationName,
            locationId: locationId,
            inviteEmails: inviteEmails
        };
        return (
            <div className='event-container'>
                <div className='event-container-header'>
                    <Header/>
                </div>
                <div className='event-container-right'>

                    <Form
                        enableReinitialize={this.state.enableReinitialize}
                        formInitialValues={FormValues}
                        type='editEvent'
                        headerTitle="Edit Event"
                        submitBtnText='Edit'
                        locationIdCallback={this.locationIdCallback}
                        handleFormSubmitCallBack={this.editEventCallback()}
                    />

                    <div className='event-form-container'>
                        <hr className='event-separator'/>

                        {this.state.invitees.length > 0 ?


                            [<div className='event-participant'>Participants ({this.state.invitees.length})</div>,
                                <table className='event-table event-participant-table'>
                                <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Signed-Up</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.invitees.map((invitee, index) =>
                                    <tr id={invitee.id} key={index}>
                                        <td>{invitee.email}</td>
                                        {invitee.isAttending ?
                                            (<td>Yes</td>) : (<td>No</td>)}
                                    </tr>)}
                                </tbody>
                            </table>] : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(EditComponent);
