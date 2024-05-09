import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/Context";
import Loader from "../../Loader";
import Card from "../Card/Card";
import "./List.css";
import InfiniteScroll from "react-infinite-scroll-component";

const List = () => {
  const { search, setSearch, abilityValue , allData } = useContext(UserContext);
  const [loader, setLoader] = useState(true);
  const [detailData, setDetailData] = useState([]);
  const [scroll, setScroll] = useState(10);
  
  const [filteredData , setFilteredData] = useState([])
  
  

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    // setNextUrl(data.next);
    return data.results.map(async (result) => {
      const res = await fetch(result.url);
      let convertedDatas = await res.json();
      return {
        id: convertedDatas.id,
        name: result.name,
        image: convertedDatas.sprites.other
          ? convertedDatas.sprites.other.dream_world.front_default
          : convertedDatas.sprites.front_shiny,
        type: convertedDatas.types,
        ability : convertedDatas.abilities.map((element) => element.ability.name)
      };
    });
  };

  const fetchDataAndSetDetailData = async () => {
    try {
      const results = await fetchData(
        `https://pokeapi.co/api/v2/pokemon?limit=${scroll}`
      );
      const resolvedData = await Promise.all(results);
      setDetailData([...resolvedData]);
      setScroll((prev) => prev + 10);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  

 

 

  useEffect(() => {
    fetchDataAndSetDetailData();
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  useEffect(() => {
    if (detailData.length !== 0) {
      setLoader(false);
    }
  }, [detailData]);

  const filtereData = () => {
    if(abilityValue == ""){
      setFilteredData([...detailData])
    }else{
      let filtered = allData.filter((element) =>
        element.ability.some((ability) => ability === abilityValue)
      );
      setFilteredData([...filtered]);
    }
  }

  console.log(filteredData);

  useEffect(() => {
    filtereData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [abilityValue , detailData])

  console.log(detailData);
  return (
    <div className="data">
      {loader ? (
        <div className="loader">
          <Loader />
        </div>
      ) : search.length !== 0 ? (
        <div className="search">
          <div className="back">
            <p onClick={() => setSearch([])}>Back</p>
          </div>
          <div className="search-data">
            {search.map((element) => (
              <Card data={element} key={element.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="list">
          <InfiniteScroll
            dataLength={detailData.length}
            next={fetchDataAndSetDetailData}
            hasMore={true}
            scrollableTarget={window}
            
          >
            {filteredData?.map((element) => (
              <Card data={element} key={element.id} />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default List;
