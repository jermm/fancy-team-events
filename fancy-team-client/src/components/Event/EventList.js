import React, {Component} from 'react';

export class EventList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            events :[]
        }
    }   

    // componentDidMount() {
    //     fetch("/graphql", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({query: `{events { id type date description}}`, variables: null})
    //     }).then(res => {
    //         return res.json();
    //     }).then(body => {
    //         if (body.data) {
    //             const events = body.data.users.map((event) =>
    //                 <li key={event.id}> {event.type} : {event.date} : {event.description}</li>
    //             );
    //             this.setState({events: events});
    //         }
    //     });
    // }

    render() {
        return (
            <div>
                <div>
                <h1>Current List of Events</h1>
                <ul>
                    <li>{this.state.events}</li>
                </ul>
                <h2>Events that you organized</h2>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Event Name</th>
                    </tr>
                    <tr>
                        <td>5-13-19</td>
                        <td>Bowling after work</td>
                    </tr>
                    <tr>
                        <td>6-18-19</td>
                        <td>Happy hour</td>
                    </tr>
                </table>
                </div>
                <div>
            <h2>Events that you participate</h2>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Event Name</th>
                </tr>
                <tr>
                    <td>5-13-19</td>
                    <td>Bowling after work</td>
                </tr>
                <tr>
                    <td>6-18-19</td>
                    <td>Happy hour</td>
                </tr>
            </table>
        </div>      
            </div> 
            
        )
    }
}