import React from 'react';
import {Formik} from 'formik';
import EventForm from './EventForm';

function determineForm(submitBtnText,headerTitle, type, props){
  if(type === 'createEvent' || type === 'editEvent'){
    return <EventForm submitBtnText={submitBtnText} headerTitle={headerTitle} {...props}/>
  }
}

function Form(props) {
  const {
    type,
    headerTitle,
    handleFormSubmitCallBack,
    formInitialValues,
    enableReinitialize,
    submitBtnText
  } = props;
  return (
      <Formik
          enableReinitialize={enableReinitialize}
          initialValues={formInitialValues}
          onSubmit={(values, actions) => {
            handleFormSubmitCallBack(values, actions)
          }}
          render = { props => determineForm(submitBtnText,headerTitle, type, props)}
      />
  )
}

export default Form;
