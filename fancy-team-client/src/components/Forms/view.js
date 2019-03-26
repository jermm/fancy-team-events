import React from 'react';
import {Formik} from 'formik';
import CreateEventForm from './CreateEventForm';

function determineForm(headerTitle, type, props){
  if(type === 'createEvent'){
    return <CreateEventForm headerTitle={headerTitle} {...props}/>
  }
}

function Form(props) {
  const {
    type,
    headerTitle
  } = props;
  return (
      <Formik
          onSubmit={(values, actions) => {
            console.log(values);
            console.log(actions);
          }}
          render = { props => determineForm(headerTitle, type, props)}
      />
  )
}

export default Form;
