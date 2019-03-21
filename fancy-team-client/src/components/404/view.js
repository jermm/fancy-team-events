import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Handle404 extends Component{

  render(){
    return (
        <>
          <div>
            <p>This Route is not supported. Click Home to go to the Home page</p>
          </div>
          <Link to='/'>Home</Link>
        </>
    )
  }

}

export default Handle404;