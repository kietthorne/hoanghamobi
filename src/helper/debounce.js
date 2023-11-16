export default function debounce(callBack,timeDelay = 300){
   let timer
   return (...agrs) => {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => callBack.apply(this,agrs),timeDelay)
      // timer = setTimeout(() => callBack(...agrs),timeDelay)
   }
}



const myUseState = (stateInital = undefined) => {
   let state = stateInital
   console.log('stateBefore:', state)
   function setState(newState){
      state = newState
      console.log('stateAffter:', state)
   }
   return [state, setState]
}

export {myUseState}