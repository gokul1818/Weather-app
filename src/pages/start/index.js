import SearchBar from "@/components/Weather/search";
import classes from "@/styles/content.module.css";
import Time from "@/components/Weather/Time";
import lottie from "lottie-web";
import Temperature from "@/components/Weather/Temperature";
import Forecast from "@/components/Weather/Forecaste";
import { useRef, useEffect, useState } from "react";
import getFormattedWeatherData from "@/url/weatherurl";
function search() {
  const [query, setQuery] = useState({ q: "chennai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const conti = useRef(null);
  useEffect(() => {
   const instance= lottie.loadAnimation({
      container: conti.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require("../../styles/rainyy.json"),
    });
    
    return () => instance.destroy();
  },[conti]);
  const container = useRef(null);
  useEffect(() => {
  const instance=  lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../styles/weather.json"),
    });
    return () => instance.destroy();

  },[]);
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className={classes.content}>
      
      <div className={classes.rain} ref={conti}>
        
      </div>
      
     
      <SearchBar setQuery={setQuery} units={units} setUnits={setUnits} /> 
      {weather ? (
        <>
          <Time weather={weather} />

          <Temperature weather={weather} />
          <Forecast title={"hourlyForecast"} items={weather.hourly} />


          
          <Forecast title={"DailyForecast"} items={weather.daily} />
        </>
      ) : (
        <div className={classes.cloud} ref={container}></div>
      )}
    </div>
  );
}
export default search;
