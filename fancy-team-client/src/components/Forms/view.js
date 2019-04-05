import React from 'react';
import {Formik} from 'formik';
import EventForm from './EventForm';

function determineForm(submitBtnText,headerTitle, locationIdCallback, type, props){
  if(type === 'createEvent' || type === 'editEvent'){
    return <EventForm locationIdCallback={locationIdCallback} submitBtnText={submitBtnText} headerTitle={headerTitle} {...props}/>
  }
}

function Form(props) {
  const {
    type,
    headerTitle,
    handleFormSubmitCallBack,
    formInitialValues,
    enableReinitialize,
    locationIdCallback,
    submitBtnText
  } = props;
  return (
      <Formik
          enableReinitialize={enableReinitialize}
          initialValues={formInitialValues}
          onSubmit={(values, actions) => {

            handleFormSubmitCallBack(values, actions)
          }}
          render = { props => determineForm(submitBtnText,headerTitle, locationIdCallback, type, props)}
      />
  )
}

export default Form;
