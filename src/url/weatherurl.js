import { DateTime } from "luxon";
// const API_key = "0293b6766a61ed2168438f018365cd61";
// b3d0ec41aa696e1818a8c52ec8836053
// 1fa9ff4126d95b8db54f3897a208e91c
// b3d0ec41aa696e1818a8c52ec8836053
const API_key = "b3d0ec41aa696e1818a8c52ec8836053";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const getWeatherData = (infoData, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoData);
    url.search = new URLSearchParams({ ...searchParams, appid: API_key });
    return fetch(url)
        .then((response) => response.json())
}
const formatCurrentWeather = (data) => {
    // console.log(data,'www')
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, tem_max, humidity, pressure },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data
    const { main: details, icon } = weather[0]
    return {
        lat, lon, temp, feels_like, tem_max, temp_min, humidity, name, dt, country, sunrise, sunset, weather, speed, details, icon, pressure
    }
}
const formatForecastWeather = (data) => {
    let { timeZone, daily, hourly } = data;
    // console.log(data,'ggg')
    daily = daily.slice(0, 10).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timeZone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })
    hourly = hourly.slice(0, 30).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timeZone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    })
    return { timeZone, daily, hourly }

}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)
    const { lat, lon } = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'current,minutely,alerts',
        units: searchParams.units,

    }).then(formatForecastWeather)
    return { ...formattedCurrentWeather, ...formattedForecastWeather }
}
const formatToLocalTime = (secs, zone, format = "ccc,dd LLL yyyy'| Time:' hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData
export { formatToLocalTime, iconUrlFromCode };


// import { DateTime } from "luxon";

// const API_KEY = "0293b6766a61ed2168438f018365cd61";
// const BASE_URL = "https://api.openweathermap.org/data/2.5";

// // https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

// const getWeatherData = (infoType, searchParams) => {
//   const url = new URL(BASE_URL + "/" + infoType);
//   url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

//   return fetch(url).then((res) => res.json());
// };

// const formatCurrentWeather = (data) => {
//   const {
//     coord: { lat, lon },
//     main: { temp, feels_like, temp_min, temp_max, humidity },
//     name,
//     dt,
//     sys: { country, sunrise, sunset },
//     weather,
//     wind: { speed },
//   } = data;

//   const { main: details, icon } = weather[0];

//   return {
//     lat,
//     lon,
//     temp,
//     feels_like,
//     temp_min,
//     temp_max,
//     humidity,
//     name,
//     dt,
//     country,
//     sunrise,
//     sunset,
//     details,
//     icon,
//     speed,
//   };
// };

// const formatForecastWeather = (data) => {
//   let { timezone, daily, hourly } = data;
//   daily = daily.slice(1,6).map((d) => {
//     return {
//       title: formatToLocalTime(d.dt, timezone, "ccc"),
//       temp: d.temp.day,
//       icon: d.weather[0].icon,
//     };
//   });

//   hourly = hourly.slice(1, 6).map((d) => {
//     return {
//       title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
//       temp: d.temp,
//       icon: d.weather[0].icon,
//     };
//   });

//   return { timezone, daily, hourly };
// };

// const getFormattedWeatherData = async (searchParams) => {
//   const formattedCurrentWeather = await getWeatherData(
//     "weather",
//     searchParams
//   ).then(formatCurrentWeather);

//   const { lat, lon } = formattedCurrentWeather;

//   const formattedForecastWeather = await getWeatherData("onecall", {
//     lat,
//     lon,
//     exclude: "current,minutely,alerts",
//     units: searchParams.units,
//   }).then(formatForecastWeather);

//   return { ...formattedCurrentWeather, ...formattedForecastWeather };
// };

// const formatToLocalTime = (
//   secs,
//   zone,
//   format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
// ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// const iconUrlFromCode = (code) =>
//   `http://openweathermap.org/img/wn/${code}@2x.png`;

// export default getFormattedWeatherData;

// export { formatToLocalTime, iconUrlFromCode };
