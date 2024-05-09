import { useContext, useState } from "react";
import "./Filter.css";
import { useEffect } from "react";
import UserContext from "../../context/Context";
const Filter = () => {
  const { setAbilityValue, setTypeValue } = useContext(UserContext);
  const [abilityList, setAbilityList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const Abilities = async () => {
    let data = await fetch("https://pokeapi.co/api/v2/ability?limit=100");
    let convertedData = await data.json();
    setAbilityList([...convertedData.results]);
  };

  const Types = async () => {
    let data = await fetch("https://pokeapi.co/api/v2/type?limit=18");
    let convertedData = await data.json();
    setTypeList([...convertedData.results]);
  };
  useEffect(() => {
    Abilities();
    Types();
  }, []);

  return (
    <div className="filter-box">
      <h1>Filters</h1>
      <div className="filters">
        <div className="abilities common">
          <h2>Abilities : </h2>
          <select onChange={(e) => setAbilityValue(e.target.value)}>
            <option value="">All Abilities</option>
            {abilityList?.map((element, index) => (
              <option key={index} value={element.name}>
                {element.name}
              </option>
            ))}
          </select>
        </div>
        <div className="types common">
          <h2>Types : </h2>
          <select onChange={(e) => setTypeValue(e.target.value)}>
            <option value="">All Types</option>
            {typeList?.map((element, index) => (
              <option key={index} value={element.name}>
                {element.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
