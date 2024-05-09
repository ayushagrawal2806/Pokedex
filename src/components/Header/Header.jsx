import { useContext, useState } from "react"
import logo from "../../assets/logo.png"
import "./Header.css"
import UserContext from "../../context/Context";
import {  useNavigate, NavLink } from "react-router-dom";
const Header = () => {
  const [searchVal , setSearchVal] = useState("");
  const {setSearch} = useContext(UserContext);
  const navigate = useNavigate();
  const handleSearch = async () => {
    if(searchVal == ""){
      alert("Input feild is Empty");
      return;
    }
    try{
      let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchVal}`);
      let converted = await data.json();
      let details = {
      name : searchVal,
      id: converted.id,
      image: converted.sprites.other
      ? converted.sprites.other.dream_world.front_default
      : converted.sprites.front_shiny,
      type: converted.types,
      };
      setSearch([details]);
      setSearchVal("");
      navigate("/");
    }
    catch(error){
      alert("This pokemon doesn't Exist")
    }
    // Navigate("/")
    // setSearchVal("")
  }
    
    
  
  return (
    <div className="header">
        <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
        </div>
        <div className="search">
          <input type="text" placeholder="Pokemon name..." value={searchVal} onChange={(e)=> setSearchVal(e.target.value) }/>
          <button onClick={handleSearch}>Search</button>
        </div>
        {/* <div className="filter">
          <label htmlFor="filters">Choose Filters: </label>
          <select name="none" id="filters">
            <option value="Choose">Choose</option>
            <option value="abilities">Abilities</option>
            <option value="characteristics">Characteristics</option>
            <option value="group">Group</option>
            <option value="habitat">Habitat</option>
            <option value="Species">Species</option>
          </select>
        </div> */}
    </div>
  )
}

export default Header;