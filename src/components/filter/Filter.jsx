
import { useContext, useState } from "react"
import "./Filter.css"
import { useEffect } from "react";
import UserContext from "../../context/Context";
const Filter = () => {
  const {setAbilityValue} = useContext(UserContext);
  const [abilityList , setAbilityList] = useState([]);
    const Abilities = async () => {
      let data = await fetch("https://pokeapi.co/api/v2/ability?limit=100");
      let convertedData = await data.json();
      setAbilityList([...convertedData.results])
    }
    useEffect(() => {
      Abilities();
    } , [])
    
  return (
    <div className="filter">
        <div className="abilities">
            <select onChange={(e) => setAbilityValue(e.target.value) }>
                <option value="">Abilities</option>
                {
                  abilityList?.map((element , index) => <option key={index} value={element.name}>{element.name}</option>)
                }
            </select>
        </div>
    </div>
  )
}

export default Filter;