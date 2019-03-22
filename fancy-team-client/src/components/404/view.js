import React from 'react';
import { Link } from 'react-router-dom';

function Handle404() {
    return (
        <>
          <div>
            <p>This Route is not supported. Click Home to go to the Home page</p>
          </div>
          <Link to='/'>Home</Link>
        </>
    );
}

export default Handle404;