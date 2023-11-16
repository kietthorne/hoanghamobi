import { useState } from "react";
import { emailUnvalid } from "@Constants/messages";
import { regEmail } from "@Constants/regex";

function FormEmailPass({onSubmit,type,alertCallBack}) {
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [valid, setValid] = useState({
      email: null,
   })


   const checkValid = () => {
      if(!regEmail.test(email)) {
         setValid(pr => ({...pr, email: emailUnvalid}))
         return false
      }
      setValid({email: null})
      return true
   }

   const formSubmit = () => {
      if(checkValid()){
         onSubmit(email,password)
      }
   }

   return ( 
      <>
         <div className="pb-4">
            <label htmlFor="email" className="text-sm block font-bold ">EMAIL ADDRESS</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email..." className="input input-bordered input-primary w-full" />
            {valid.email && <span className="text-sm text-red-500 italic">*{valid.email}</span>}
          </div>
          <div className="pb-4">
            <div className="flex justify-between">
               <label htmlFor="password" className="text-sm block font-bold">PASSWORD</label>
               <span>Forgot</span>
            </div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password..." className="input input-bordered input-primary w-full" />
          </div>
          {alertCallBack &&
            <div className='py-3 px-4 mb-4 rounded text-red-500 bg-red-50'>
               {alertCallBack}
          </div>
          }
          <div className="text-center">
            <button onClick={formSubmit} disabled={!email || !password} className={`${!email || !password ? `cursor-not-allowed disabled:bg-gray-300` : ''} w-full leading-none bg-blue-700 hover:bg-blue-800 text-white font-bold mx-auto py-3 px-4 rounded focus:outline-none focus:shadow-outline`} type="button">
               {type}
               </button>
          </div>
      </>
    );
}

export default FormEmailPass;