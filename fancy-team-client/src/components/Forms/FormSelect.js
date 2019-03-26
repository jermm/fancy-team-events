import React from 'react';
import { Field } from 'formik';
import ids from 'short-id';

function FormSelect (props) {
  const {
    name,
    options, // Options is an Array of options
    className,
    id,
    labelName,
    handleChange,
  } = props;

  const optionLists = options.map(optionName => <option key={ids.generate()} value={optionName}>{optionName.charAt(0).toUpperCase() + optionName.slice(1)}</option>);
  return (
    <div className={className}>
      <label htmlFor={id}>{labelName}</label>
      <Field component="select" name={name} id={id} onChange={handleChange} >
        {optionLists}
      </Field>
    </div>
  );
}

export default FormSelect;