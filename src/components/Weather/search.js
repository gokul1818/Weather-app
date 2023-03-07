import classes from "@/styles/searchBar.module.css";
// import classes from "@/styles/content.module.css";
import { useState } from "react";

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
    setCity(searchterm);
    console.log("search", searchterm);
  };
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };
  const handleSearchClick = () => {
    event.preventDefault();
    if (city !== "") setQuery({ q: city });
    setCity("");
  };

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
        
          <div className={classes.searchBar}>
            <UilSearch
              className={classes.icon}
              size={15}
              onClick={handleSearchClick}
            />
            {console.log(city,'city')}
            <form onClick={handleSearchClick} >            <input
              value={city}
              
              onChange={onchange}
              type="text"
              placeholder="Search for city...."
              className={classes.Search}
            />
            </form>

            <UilLocationPinAlt
              className={classes.icon}
              onClick={handleLocationClick}
              size={15}
            />
          </div>
          <div className={classes
          .drop}>
            {data
              .filter((item) => {
                const searchterm = city.toLowerCase();
                const name = item.name.toLowerCase();
                return (
                  searchterm &&
                  name.startsWith(searchterm) &&
                  name !== searchterm
                );
              })
              .slice(0, 8)
              .map((item, index) => (
                <div className={classes.droplist} key={index} onClick={() => onsearch(item.name)}>
                  {item.name}
                </div>
              ))}
          </div>

          <div className={classes.unit}>
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
