import classes from "@/styles/Temperature.module.css";
import {
  UilWind,
  UilRaindropsAlt,
  UilSun,
  UilSunset,
  UilCloudSun,
  UilTemperatureHalf,
} from "@iconscout/react-unicons";
import { formatToLocalTime,iconUrlFromCode } from "@/url/weatherurl";
function Temperature({weather: {
  details,
  icon,
  temp,
  temp_min,
  temp_max,
  sunrise,
  sunset,
  speed,
  pressure,
  humidity,
  feels_like,
  timezone,
},} ) 

{
  return (

    <div className={classes.climate}>
      {
// console.log(temp_max)

      }
      <div className={classes.details}>
        <div>
          <img src={iconUrlFromCode(icon)} />
        <p className={classes.temp} >{`${temp.toFixed()}°`}</p>
        </div>

        <div className={classes.weather}>
          <p>{details}</p>
        </div>  
      </div>
      <div className={classes.weatherDetails}>
        <p>Weather details</p>
        <div className={classes.locate}>
          <div>
            <UilWind />
            Wind
            <span>{`${speed.toFixed()} km/h`}</span>
          </div>
          <div>
            <UilRaindropsAlt />
            Humidity
            <span>{`${humidity.toFixed()}%`} </span>
          </div>
          </div>
          <div className={classes.locate}>
          <div>
            <UilTemperatureHalf />
            Feels like
            <span>{`${feels_like.toFixed()}°`}</span>
          </div>
          <div>
            <UilTemperatureHalf />
           Air pressure
            <span>{`${pressure.toFixed()}:hpa`}</span>
          </div>
        </div>
      </div>
      <div className={classes.viewSun}>
        <UilSun  />{" "}
        <p>
          Rise:<span> {formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </p>{" "}
        <p>|</p>
        <UilSunset />
        <p>
          set:<span>{formatToLocalTime(sunset, timezone, "hh:mm a")}
        </span>
        </p>{" "}
        <p>|</p>
        <UilSun />{" "}
        <p className={classes.high} >
          High:<span>{`${temp.toFixed()}°`}</span>
        </p>{" "}
        <p>|</p>
        <UilCloudSun/>{" "}
        <p className={classes.low}>
          Low:<span>{`${temp_min.toFixed()}°`}</span>
        </p>{" "}
      </div>
    </div>
  );
}
export default Temperature;
