import { useContext } from "react";
import Card from "../Card/Card";
import { NavLink } from "react-router-dom";
import "./Favourite.css";
import UserContext from "../../context/Context";

const Favourite = () => {
  const { favouriteData, setAbilityValue, setTypeValue } =
    useContext(UserContext);
  console.log(favouriteData);
  return (
    <div className="favourite-cont">
      {favouriteData.length == 0 ? (
        <div className="empty">
          <h2>Add your favourites pokemons here!:)</h2>
          <NavLink
            to={"/"}
            onClick={() => {
              setAbilityValue("");
              setTypeValue("");
            }}
          >
            <button>Go to Home Page</button>
          </NavLink>
        </div>
      ) : (
        favouriteData.map((element) => <Card data={element} key={element.id} />)
      )}
    </div>
  );
};

export default Favourite;
