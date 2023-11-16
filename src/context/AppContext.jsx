
import { createContext, useState } from "react";

const AppContext = createContext()
export function AppProvider({children}){
   const [theme, setTheme] = useState({theme:'dark', layout: 'harizontal'})
   const [cart, setCart] = useState([])
   const updateCart = (product) => {
      setCart(pr => [...pr,{product,quatity: 1}] )
   }
   
   return(
      <AppContext.Provider value={{theme,cart,updateCart,setTheme}} >
         {children}
      </AppContext.Provider> 
   )
}
export default AppContext 