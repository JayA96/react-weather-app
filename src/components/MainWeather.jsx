import React from "react";
import MiniWeather from "./MiniWeather";
import { CircularProgress } from "@mui/material";
import { getAnimatedIcon, convertToCelsius } from '../utils'

function MainWeather(props) {

    const weatherData = props.weatherData;

    const dateTime = weatherData.current.time;
    
    if (weatherData.loaded) {
        return (
            <div className="main-weather">
                <h2>{weatherData.location}</h2>
                <h3>{dateTime.day}, {dateTime.date} {dateTime.month}</h3>
                <p>{dateTime.hour}:{dateTime.minute}</p>
                <img src={getAnimatedIcon(weatherData.current.weatherId, weatherData.current.day)} alt="weather" />
                <h1>{convertToCelsius(weatherData.current.temp)}°C</h1>
                <div className="hourly">
                    {weatherData.hourly.map(hour =>
                        <MiniWeather
                            key={hour.id}
                            temp={convertToCelsius(hour.temp)}
                            hours={hour.time.hour}
                            minutes={hour.time.minute}
                            id={hour.weatherId}
                            day={hour.day}
                        />)}
                </div>
            </div>
        );
    } else if (weatherData.errorCode === 1000) {
        return (
            <div className="main-weather">
                <h1 className="error">Search for a location to get the weather</h1>
            </div>
        )
    } else {
        return (
            <div className="loading">
                <CircularProgress className="spinner" />
            </div>
        );
    }
}

export default MainWeather;