import React, {Component} from "react";

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch("/graphql", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: `{users { id name email}}`, variables: null})
        }).then(res => {
            return res.json();
        }).then(body => {
            if (body.data) {
                const users = body.data.users.map((user) =>
                    <li key={user.id}> {user.name} : {user.email}</li>
                );
                this.setState({users: users});
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Current Users</h1>
                <ul>
                    {this.state.users}
                </ul>
            </div>
        )
    }
}