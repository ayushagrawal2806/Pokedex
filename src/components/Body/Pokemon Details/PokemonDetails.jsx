
import { useParams } from "react-router-dom"
import "./PokemonDetails.css"
import { useEffect, useState } from "react";
const PokemonDetails = () => {
  const {id} = useParams();
  const [detailsData , setDetailsData] = useState();
  const PokemonDetails = async() => {
    try{
      let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      let convertedData = await data.json();
      setDetailsData({
        id : convertedData.id,
        name : convertedData.name,
        height : convertedData.height,
        weight : convertedData.weight,
        type : convertedData.types,
        stats : convertedData.stats,
        ability : convertedData.abilities,
        moves : (convertedData.moves.length > 9) ? convertedData.moves.splice(0,9) : convertedData.moves,
        image : convertedData.sprites.other
        ? convertedData.sprites.other.dream_world.front_default
        : convertedData.sprites.front_shiny,
      })
    }
    catch(error){
      alert(error.message);
    }

  }
  useEffect(() => {
    PokemonDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [])
  console.log(detailsData);
  let type = detailsData?.type.map((element) => element.type.name);
  let ability = detailsData?.ability.map((element) => element.ability.name);
  let stats = detailsData?.stats.map((element) => element);
  let moves = detailsData?.moves.map((element) => element.move.name);
    return (
      <div className="pokemon-details">
        <div className="details-box">
          <div className="left">
            <div className="id">
              <h2>#{detailsData?.id}</h2>
            </div>
            <div className="name">
              <h2>{detailsData?.name}</h2>
            </div>
            <div className="image">
              <img src={detailsData?.image} alt="" />
            </div>
            <div className="types">
              {
                type?.map((element, index) => <div className = "type-box" key={index}>{element}</div> )
              }
            </div>
            <div className="height">
              <h2>Height : {isNaN(detailsData?.height) ? "N/A" : Number.parseFloat(detailsData?.height * 0.1).toFixed(1)}m</h2>
            </div>
            <div className="weight">
              <h2>Weight : {isNaN(detailsData?.height) ? "N/A" : Number.parseFloat(detailsData?.weight / 10).toFixed(1)}kg</h2>
            </div>
          </div>
          <div className="right">
            <div className="abilities">
              <h2>Abilities</h2>
              <ul>
              {
                ability?.map((element , index) => <li key={index}>{element}</li>)
              }
              </ul>
            </div>
            <div className="stats">
              <h2>Stats</h2>
              <div className="stats-data">
                {
                  stats?.map((element , index) => <div key={index} className="stats-data-details">
                    <h3>{element.stat.name}</h3>
                    <p>{element.base_stat}</p>
                  </div>)
                }
              </div>
            </div>
            <div className="moves">
              <h2>Moves</h2>
              <ul>
                {
                  moves?.map((element , index) => <li key={index}>{element}</li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default PokemonDetails