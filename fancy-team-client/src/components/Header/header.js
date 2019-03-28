import React, { Component } from 'react';
import EventLogo from "./calendar-events-svgrepo-com.svg";
import './header.scss';

function Header(props) {
    return (
        <div>
           <header className="event-header">
                <img src={EventLogo} className="event-logo" alt="Event header logo" width="200" height="300" />
                <h1 className='event-title'>Fancy Event Organizer</h1>
            </header> 
        </div>
    )
}

export default Header;