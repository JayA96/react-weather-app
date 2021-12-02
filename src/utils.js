import Icons from './icons'
import * as Backgrounds from './backgrounds';

export function getCurrentLocation() {
    // Function to get current user coords and store in promise
    return new Promise((resolve, reject) => {
        const coordinates = {
            lat: null,
            lon: null
        };
        function successCallback(pos) {
            coordinates.lat = pos.coords.latitude;
            coordinates.lon = pos.coords.longitude;
            resolve(coordinates);
        }
        function errorCallback(error) {
            reject(error)
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    })
}

export function getCoordinatesFromName(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
        .then(res => res.json())
        .then(data => {return data.coords})
}

export function getDateTimeFromOffset(datetime, gmtOffset) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date((datetime + gmtOffset) * 1000);

    return {
        day: days[now.getDay()],
        date: now.getDate(),
        month: months[now.getMonth()],
        hour: (now.getHours() < 10 ? '0' : '') + now.getHours(),
        minute: (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
    }
}

export function getAnimatedIcon(id, day) {
    // Determines icon to be displayed from weather id
    switch (true) {
        case (id === 211):
            return day ? Icons.thunderstormsday : Icons.thunderstormsnight;
        case (id < 233):
            return day ? Icons.thunderstormsdayrain : Icons.thunderstormsnightrain;
        case (id < 322):
            return day ? Icons.drizzle : Icons.partlycloudynightdrizzle;
        case (id < 532):
            return day ? Icons.rain : Icons.partlycloudynightrain;
        case (id < 615 && id > 602):
            return day ? Icons.sleet : Icons.partlycloudynightsleet;
        case (id < 623):
            return day ? Icons.snow : Icons.partlycloudynightsnow;
        case (id === 701):
            return Icons.mist;
        case (id === 711):
            return day ? Icons.smoke : Icons.partlycloudynightsmoke;
        case (id === 721):
            return day ? Icons.haze : Icons.hazenight;
        case (id === 741):
            return day ? Icons.fog : Icons.fognight;
        case (id < 763):
            return day ? Icons.dust : Icons.dustnight;
        case (id === 771):
            return Icons.wind;
        case (id === 781):
            return Icons.tornado;
        case (id === 800):
            return day ? Icons.clearday : Icons.clearnight;
        case (id < 803):
            return day ? Icons.partlycloudyday : Icons.partlycloudynight;
        case (id === 803):
            return Icons.cloudy;
        case (id === 804):
            return day === true ? Icons.overcast : Icons.overcastnight;
        default:
            return Icons.cloudy;
    }
}

export function getBackground(id, day) {
    // Dynamic background depending on weather and time of day
    var bg = null;

    switch (true) {
        case (id < 233):
            bg = day ? Backgrounds.ThunderDay : Backgrounds.ThunderNight;
            break;
        case (id < 532):
            bg = Backgrounds.Rain;
            break;
        case (id < 623):
            bg = day ? Backgrounds.SnowDay : Backgrounds.SnowNight;
            break;
        case (id < 763):
            bg = day ? Backgrounds.FogDay : Backgrounds.FogNight;
            break;
        case (id < 782):
            bg = Backgrounds.Tornado;
            break;
        case (id === 800):
            bg = day ? Backgrounds.ClearDay : Backgrounds.ClearNight;
            break;
        case (id < 804):
            bg = day ? Backgrounds.CloudyDay : Backgrounds.CloudyNight;
            break;
        case (id === 804):
            bg = Backgrounds.Overcast;
            break
        default:
            bg = Backgrounds.CloudyDay;
    }
    document.body.style.background = `url(${bg}), ${day ? "steelblue" : "rgb(189, 189, 189)"}`;
}

export function convertToCelsius(temp) {
    return Math.round(temp - 273.15);
}