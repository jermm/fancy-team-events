import React from 'react';
import {Formik} from 'formik';
import EventForm from './EventForm';

function determineForm(headerTitle, type, props){
  if(type === 'createEvent' || type === 'editEvent'){
    return <EventForm headerTitle={headerTitle} {...props}/>
  }
}

function Form(props) {
  const {
    type,
    headerTitle,
    handleFormSubmitCallBack,
    formInitialValues,
    enableReinitialize
  } = props;
  return (
      <Formik
          enableReinitialize={enableReinitialize}
          initialValues={formInitialValues}
          onSubmit={(values, actions) => {
            handleFormSubmitCallBack(values, actions)
          }}
          render = { props => determineForm(headerTitle, type, props)}
      />
  )
}

export default Form;
