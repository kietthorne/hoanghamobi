import React, { useState } from 'react'
import PropsTypes from 'prop-types'
import InputControl from './InputControl'
Form.propTypes = {
   fields: PropsTypes.any.isRequired,
   onSubmit: PropsTypes.func.isRequired,
   layout: PropsTypes.oneOf(['vertical', 'harizontal'])
}

// const FormState = (initial) => {
//    const [state, setState] = useState(initial)
//    const onChange = (e) => setState(e.target.value)
//    return [state, onChange]
// }

function Form({fields,onSubmit,layout}) {
   
   const [stateForm, setStateForm] = useState(fields)
   const onChange = (e,name) => {
      setStateForm({...fields,[name]: e.target.value})
   }
   const handleSubmitForm = () => {
      //check validate form
      if(true){
         onSubmit(stateForm)
      } 
   }
  return (
    <form onSubmit={handleSubmitForm} className="form-control">
      {
         fields.map(field => 
            <InputControl {...field} layout={layout} onChange={(e) => onChange(e,field.name)}/>
         )
      }      
      <button type='submit'>
         submit form
      </button>
    </form>
  )
}

export default Form