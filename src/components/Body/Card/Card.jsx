

import { Link } from "react-router-dom";
import "./Card.css"
import { IoMdInformationCircleOutline } from "react-icons/io";
const Card = (props) => {
  let obj = props;
  let arr = obj.data.type.map((element) => element.type.name)
  return (
   <div className="card">
      <div className="number-details">
        <h1>#{obj.data.id}</h1>
        <Link to={`/PokemonDetails/${obj.data.id}`}><IoMdInformationCircleOutline className="icon"  title="Show Details"/></Link>
      </div>
      <div className="image">
        <img src={obj.data.image} alt="" />
      </div>
      <div className="name">
        <h1>{obj.data.name}</h1>
      </div>
      <div className="type">{
        arr.map((element, index) => <div className = "type-box" key={index}>{element}</div> )
      }</div>
   </div>
  )
}

export default Card