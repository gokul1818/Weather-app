import classes from '@/styles/forecast.module.css'
import { iconUrlFromCode } from '@/url/weatherurl';

function Forecast({ title,items }) {
  return (
    <> 
      <div className={classes.title}>
          <p>{title}</p>
        </div>
      <div className={classes.scroll} >
      
        <div className={classes.Forecast} >

          {items.map((item, index) => (
            <div 
            key={index}
             className={classes.ForecastDetails}>
              <p >{item.title}</p>
              <img src={iconUrlFromCode(item.icon)}
              />
              <p>{`${item.temp.toFixed()}°`}</p>
            </div>

          ))}
        </div>

      </div>
    </>
  );
}
export default Forecast;
