import { Link } from "react-router-dom";
import "./Card.css";

import { useContext } from "react";
import UserContext from "../../context/Context";

const Card = (props) => {
  const { favouriteData, setFavouriteData } = useContext(UserContext);
  let obj = props;
  let types = obj.data.type.map((element) => element.type.name);
  const handleClick = () => {
    if (obj.data.flag) {
      obj.data.flag = false;
    } else {
      obj.data.flag = true;
    }

    let flag = true;
    favouriteData.forEach((element) => {
      if (element.id == obj.data.id) {
        flag = false;
      }
    });
    if (obj.data.flag && flag) {
      setFavouriteData([...favouriteData, { ...obj.data }]);
    } else {
      let filter = favouriteData.filter((element) => element.id != obj.data.id);
      setFavouriteData([...filter]);
    }
  };
  return (
    <div className="card">
      <div className="number-details">
        <h1>#{obj.data.id}</h1>
        <div className="icons-like">
          <span className="likeicon" title="Like" onClick={handleClick}>
            {obj.data.flag ? "❤️️" : "🤍"}
          </span>
          <Link to={`/PokemonDetails/${obj.data.id}`}>
            <span className="detailicon" title="show detail">
              ⓘ
            </span>
          </Link>
        </div>
      </div>
      <div className="image">
        <img src={obj.data.image} alt="" />
      </div>
      <div className="name">
        <h1>{obj.data.name}</h1>
      </div>
      <div className="type">
        {types?.map((element, index) => (
          <div className="type-box" key={index}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
