import classes from "../../styles/content.module.css";
import React, { useState, useEffect } from "react";

import { formatToLocalTime } from "@/url/weatherurl";
function Time({ weather: { dt, timezone, name, country } }) {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <>
   
      <div className={classes.time}>
        {" "}
        <p> {date.toLocaleDateString()} |</p>

        <p> Time : {date.toLocaleTimeString()}</p>
      </div>
      <div className={classes.city}>
        <p>{`${name}, ${country}`}</p>
      </div>
    </>
  );
}
export default Time;
