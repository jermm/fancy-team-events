import React from 'react';
import { Link } from 'react-router-dom';

function LinkButton(props){
  const {link, text} = props;
  return <Link className='linkButton' to={link}>{text}</Link>
}

export default LinkButton;