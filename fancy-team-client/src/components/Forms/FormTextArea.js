import React from 'react';

function FormTextArea (props) {
  const {
    name,
    placeholder,
    labelText,
    id,
    wrapperDivClassName,
    handleChange
  } = props;

  return (
      <div className={`${wrapperDivClassName} form-group`}>
        <label htmlFor={id}>{labelText}</label>
        <textarea name={name} rows='8' cols='50' placeholder={placeholder} id={id} onChange={handleChange} className='form-control'/>
      </div>
  )
}

export default FormTextArea;