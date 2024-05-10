import { useEffect, useState } from "react";
import UserContext from "./Context";
// eslint-disable-next-line react/prop-types
const MyContext = ({ children }) => {
  const [search, setSearch] = useState([]);
  const [abilityValue, setAbilityValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [allData, setAllData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const fetchAllData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map(async (result) => {
      const res = await fetch(result.url);
      let convertedDatas = await res.json();
      return {
        id: convertedDatas.id,
        name: result.name,
        image: convertedDatas.sprites.other
          ? convertedDatas.sprites.other.dream_world.front_default == null
            ? convertedDatas.sprites.other.home.front_default
            : convertedDatas.sprites.other.dream_world.front_default
          : convertedDatas.sprites.front_shiny,
        type: convertedDatas.types,
        ability: convertedDatas.abilities.map(
          (element) => element.ability.name
        ),
        types: convertedDatas.types.map((element) => element.type.name),
        flag: favouriteData.some((item) => item.id === convertedDatas.id),
      };
    });
  };

  const AllData = async () => {
    try {
      const results = await fetchAllData(
        `https://pokeapi.co/api/v2/pokemon?limit=800`
      );
      const resolvedData = await Promise.all(results);
      setAllData([...resolvedData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    AllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserContext.Provider
      value={{
        search,
        setSearch,
        abilityValue,
        setAbilityValue,
        typeValue,
        setTypeValue,
        favouriteData,
        setFavouriteData,
        allData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MyContext;
