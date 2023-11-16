import debounce from "../helper/debounce"
import '@Assets/less/search.less'

export default function Search({placeholder,onSearching}){

   const onChange = (debounce((e) => {
      onSearching(e.target.value)
   }, 300))

   return (
      <div className="search-control">
         <input type="text" onChange={onChange} placeholder={placeholder} />
      </div>
   )
}