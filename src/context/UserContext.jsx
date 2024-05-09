import {  useState } from 'react'
import UserContext from './Context'
// eslint-disable-next-line react/prop-types
const MyContext = ({children}) => {
    const [search , setSearch] = useState([]);
    const [abilityValue , setAbilityValue] = useState("");
  return (
    <UserContext.Provider value={{search , setSearch , abilityValue , setAbilityValue}}>
        {children}
    </UserContext.Provider>
  )
}

export default MyContext;