import classes from "@/styles/searchBar.module.css";
// import classes from "@/styles/content.module.css";
import { useState } from "react";
import { UilSearch, UilLocationPinAlt } from "@iconscout/react-unicons";
function SearchBar({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

const change=(e)=>{
  setCity(e.currentTarget.value)
}
const handleUnitsChange = (e) => {
  const selectedUnit = e.currentTarget.name;
  if (units !== selectedUnit) setUnits(selectedUnit);
};
  const handleSearchClick = () => {
event.preventDefault();
    if (city !== "") setQuery({ q: city });
setCity('')
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
          <UilSearch className={classes.icon} size={15} 
          onClick={handleSearchClick}
          />
          <input
            value={city}

            onChange={change}
            type="text"
            placeholder="Search for city...."
            className={classes.Search}
          />
          <UilLocationPinAlt className={classes.icon}
          onClick={handleLocationClick}
          size={15} />
        </div>

        <div className={classes.unit}>
          <button
            name="metric"
          onClick={handleUnitsChange}

            className={classes.metric}
            // onClick={handleUnitsChange}
          >
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
          onClick={handleUnitsChange}

            className={classes.imperial}
            // onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchBar;