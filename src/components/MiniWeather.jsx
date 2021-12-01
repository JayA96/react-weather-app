import React, { useEffect } from "react";
import * as WeatherIcons from "react-icons/wi"

function MiniWeather(props) {

    const day = props.day;

    function getMiniIcon(id, day) {
        switch (true) {
            case (id < 233):
                return day ? <WeatherIcons.WiDayThunderstorm className="mini-icon"/> : <WeatherIcons.WiNightThunderstorm className="mini-icon"/>;
            case (id < 322):
                return day ? <WeatherIcons.WiRainMix className="mini-icon"/> : <WeatherIcons.WiNightRainMix className="mini-icon"/>;
            case (id < 531):
                return day ? <WeatherIcons.WiRain className="mini-icon"/> : <WeatherIcons.WiNightRain className="mini-icon"/>;
            case (id === 611):
                return day ? <WeatherIcons.WiSleet className="mini-icon"/> : <WeatherIcons.WiNightSleet className="mini-icon"/>;
            case (id < 623):
                return day ? <WeatherIcons.WiSnow className="mini-icon"/> : <WeatherIcons.WiNightSnow className="mini-icon"/>;
            case (id === 731):
                return <WeatherIcons.WiDust className="mini-icon"/>;
            case (id < 742):
                return day ? <WeatherIcons.WiDayFog className="mini-icon"/> : <WeatherIcons.WiNightFog className="mini-icon"/>;
            case (id < 763):
                return <WeatherIcons.WiDust className="mini-icon"/>;
            case (id === 771):
                return <WeatherIcons.WiStrongWind className="mini-icon"/>;
            case (id === 781):
                return <WeatherIcons.WiTornado className="mini-icon"/>;
            case (id === 800):
                return day ? <WeatherIcons.WiDaySunny className="mini-icon"/> : <WeatherIcons.WiNightClear className="mini-icon"/>;
            case (id < 804):
                return day ? <WeatherIcons.WiDayCloudy className="mini-icon"/> : <WeatherIcons.WiNightCloudy className="mini-icon"/>;
            case (id === 804):
                return <WeatherIcons.WiCloudy className="mini-icon"/>
            default:
                return <WeatherIcons.WiCloudy className="mini-icon"/>
        }
    }
    
    useEffect(() => {
        const icons = document.getElementsByClassName("mini-icon");
        const iconsArray = [...icons];
        iconsArray.map(icon => icon.style.color = (day ? "rgb(50, 50, 50)" : "rgb(173, 173, 173)"));
    }); 
    

    return (
        <div className="mini-weather-container">
            {getMiniIcon(props.id, day)}
            <h3>{props.temp}°C</h3>
            <p>{props.hours}:{props.minutes}</p>
        </div>
    )
}

export default MiniWeather;