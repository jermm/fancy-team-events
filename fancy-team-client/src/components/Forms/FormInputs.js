import React from 'react';

function FormInputs (props) {
  const {
    type,
    name,
    placeholder,
    labelText,
    id,
    wrapperDivClassName,
      handleChange
  } = props;

  return (
      <div className={wrapperDivClassName}>
        <label htmlFor={id}>{labelText}</label>
        <input type={type} name={name} placeholder={placeholder} id={id} onChange={handleChange}/>
      </div>
  )
}

export default FormInputs;