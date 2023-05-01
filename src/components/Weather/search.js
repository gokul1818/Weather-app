import classes from "@/styles/searchBar.module.css";
// import classes from "@/styles/content.module.css";
import { useEffect, useState } from "react";

import { UilSearch, UilLocationPinAlt } from "@iconscout/react-unicons";
function SearchBar({ setQuery, units, setUnits }) {
  const data = require("../../pages/city.json");

  const [city, setCity] = useState("");

  // const [value, setvalue] = useState("");
  // const [units, setUnits] = useState("");
  const onchange = (e) => {
    setCity(e.currentTarget.value);
  };

  const onsearch = (searchterm) => {
    setQuery({ q: searchterm });
    setCity("");
 
    // setCity(searchterm);
    // alert(searchterm);
  };
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };
  const handleSearchClick = () => {
    event.preventDefault();

     setQuery({ q: city });
    setCity("");
    return;
  };
useEffect(()=>{
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  },[setQuery]
)

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  return (
    <div className={classes.content}>
      <div className={classes.sear}>
        {/* <form onClick={handleSearchClick}> */}
        <div className={classes.searchBar}>
          <UilSearch
            className={classes.icon}
            size={15}
            onClick={handleSearchClick}
          />
          {/* {console.log(city, "city")} */}
          <input
            value={city}
            onChange={onchange}
            type="text"
            // onKeyPress={handleKeypress}
            placeholder="Search for city...."
            className={classes.Search}
          />

          <UilLocationPinAlt
            className={classes.icon}
            onClick={handleLocationClick}
            size={15}
          />
        </div>
        {/* </form> */}
        <div className={classes.drop}>
          {data
            .filter((item) => {
              const searchterm = city.toLowerCase();
              const name = item.name.toLowerCase();
              return (
                searchterm && name.startsWith(searchterm) && name !== searchterm
              );
            })
            .slice(0, 8)
            .map((item, index) => (
              <div
                className={classes.droplist}
                key={index}
                onClick={() => onsearch(item.name)}
              >
                {item.name}
              </div>
            ))}
        </div>

        <div className={classes.unit}>
          {/* {city} */}
          <button
            name="metric"
            onClick={handleUnitsChange}
            className={classes.metric}
          >
            celsius
          </button>
          <p className={classes.or}> or </p>
          <button
            name="imperial"
            onClick={handleUnitsChange}
            className={classes.imperial}
          >
            Fahrenheit
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
