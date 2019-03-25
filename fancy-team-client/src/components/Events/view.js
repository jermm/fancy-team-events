import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Header, Icon, Message, Table } from 'semantic-ui-react';
import config from '../../config';

export default withAuth(class Events extends Component {
    constructor(props) {
        super(props);
        this.state = { events: null, failed: null };
    }

    componentDidMount() {
        this.getEvents();
    }

    async getEvents() {
        if (!this.state.events) {
            try {
                const accessToken = await this.props.auth.getAccessToken();
                /* global fetch */
                const response = await fetch(config.resourceServer.eventsUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status !== 200) {
                    this.setState({ failed: true });
                    return;
                }

                let index = 0;
                const data = await response.json();
                const events = data.events.map((event) => {
                    const date = new Date(event.date);
                    const day = date.toLocaleDateString();
                    const time = date.toLocaleTimeString();
                    index += 1;
                    return {
                        date: `${day} ${time}`,
                        text: event.text,
                        id: `event-${index}`,
                    };
                });
                this.setState({ events, failed: false });
            } catch (err) {
                this.setState({ failed: true });
                /* eslint-disable no-console */
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div>
                <Header as="h1"><Icon name="mail outline" /> My Events</Header>
                {this.state.failed === true && <Message error header="Failed to fetch events." />}
                {this.state.failed === null && <p>Fetching Messages..</p>}
                {this.state.events &&
                <div>
                    <p>This component makes a GET request to the backend graphql server which must be running at <code>localhost:4000/graphql</code></p>

                    <Table>
                        <thead>
                        <tr>
                            <th>Date</th><th>Event</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.events.map(event => <tr id={event.id} key={event.id}><td>{event.date}</td><td>{event.text}</td></tr>)}
                        </tbody>
                    </Table>
                </div>
                }
            </div>
        );
    }
});
