import React from 'react'
import PropsTypes from 'prop-types'

InputControl.propTypes = {
  fields: PropsTypes.object.isRequired,
  onSubmit: PropsTypes.func.isRequired
}


function InputControl(props) {
  // const {name,value,placeholder,type,disable,onChange,onBlur,valid,layout} = props
  const {name,onChange,onBlur,error,layout, ...common} = props 

  return (
    <div className="form-control input-control">
      <label htmlFor={name}>{name}</label>

      <input 
        {...common}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        />

      {error && 
        <p className="error">
          {error}
        </p>
      }
    </div>
  )
}

export default InputControl