import React from 'react';
import {Formik} from 'formik';
import CreateEventForm from './CreateEventForm';

function determineForm(type, props){
  if(type === 'createEvent'){
    return <CreateEventForm {...props}/>
  }
}

function Form(props) {
  const {
    type
  } = props;
  return (
      <Formik
          onSubmit={(values, actions) => {
            console.log(values);
            console.log(actions);
          }}
          render = { props => determineForm(type, props)}
      />
  )
}

export default Form;
