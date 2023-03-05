import classes from "../../styles/content.module.css";
import { formatToLocalTime } from "@/url/weatherurl";
function Time({ weather: { dt, timezone, name, country }}) {
  return (
    <>
      <div className={classes.time}>{formatToLocalTime(dt, timezone)}</div>
      <div className={classes.city}>
        <p>{`${name}, ${country}`}</p>
      </div>
    </>
  );
}
export default Time;
