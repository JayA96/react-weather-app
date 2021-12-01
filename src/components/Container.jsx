import React, {useState, useEffect} from "react";
import Search from "./Search";
import MainWeather from "./MainWeather";
import AlertContainer from "./AlertContainer";
import {getDateTimeFromOffset, getCurrentLocation, getBackground} from '../utils'
import data from '../cities.json';

// Container to allow lifting of state from Search, MainWeather and SearchSuggestions
function Container() {

    /* State Management - All states have been lifted up to container to allow
    data to be passed easily between them */
    const [searchText, setSearchText] = useState("");
    const [weatherData, setWeatherData] = useState({
        location: null,
        gmtOffset: null,
        loaded: false,
        error: false,
        errorCode: null,
        current: {
            time: null,
            weatherId: null,
            temp: null,
            day: true
        },
        hourly: [{}]
    });
    const [suggestions, setSuggestions] = useState([]);

    function handleSearchChange(event) {
        setSearchText(event.target.value);
        setWeatherData({
            ...weatherData,
            errorCode: null
        })
    }

    function submitSearch(event) {
        // Submit search query and prevent page refresh
        getSearchedLocation(searchText);
        setSearchText("");
        event.preventDefault();
    }

    function getSearchedLocation(cityName) {
        /* Make API request to find coordinates for city, then either call
        getCurrentWeatherDataFromCoordinates or store error code in weatherData */
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 400) {
                return Promise.reject(400)
            }
            else if (res.status === 404) {
                return Promise.reject(res.status);
            } else {
                return Promise.reject(res.status)
            }
        })
        .then(data => getWeatherDataFromCoordinates(data.coord.lat, data.coord.lon))
        .catch(error => setWeatherData({
            ...weatherData,
            error: true,
            errorCode: error
        }))
    }

    function getWeatherDataFromCoordinates(lat, lon) {
        /* locationUrl is needed to fetch the city name from coords. This is necessary
        when fetching the user's current location, as only the users coordinates are
        granted */
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
        // weatherUrl is needed to fetch weather data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${process.env.REACT_APP_WEATHER_KEY}`
        Promise.all([fetch(locationUrl), fetch(weatherUrl)])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(([location, weather]) => setWeatherData({
                ...weatherData,
                location: location.name,
                gmtOffset: weather.timezone_offset,
                loaded: true,
                error: false,
                errorCode: null,
                current: {
                    weatherId: weather.current.weather[0].id,
                    temp: weather.current.temp,
                    time: getDateTimeFromOffset(weather.current.dt, weather.timezone_offset),
                    day: weather.current.weather[0].icon.charAt(2) === "d" ? true : false       // use icon name to determine if it's day or night
                },
                hourly: [
                    {
                        id: 0,
                        weatherId: weather.hourly[1].weather[0].id,
                        temp: weather.hourly[1].temp,
                        time: getDateTimeFromOffset(weather.hourly[1].dt, weather.timezone_offset),
                        day: weather.hourly[1].weather[0].icon.charAt(2) === "d" ? true : false
                    },
                    {
                        id: 1,
                        weatherId: weather.hourly[3].weather[0].id,
                        temp: weather.hourly[3].temp,
                        time: getDateTimeFromOffset(weather.hourly[3].dt, weather.timezone_offset),
                        day: weather.hourly[3].weather[0].icon.charAt(2) === "d" ? true : false
                    },
                    {
                        id: 2,
                        weatherId: weather.hourly[5].weather[0].id,
                        temp: weather.hourly[5].temp,
                        time: getDateTimeFromOffset(weather.hourly[5].dt, weather.timezone_offset),
                        day: weather.hourly[5].weather[0].icon.charAt(2) === "d" ? true : false
                    },
                    {
                        id: 3,
                        weatherId: weather.hourly[7].weather[0].id,
                        temp: weather.hourly[7].temp,
                        time: getDateTimeFromOffset(weather.hourly[7].dt, weather.timezone_offset),
                        day: weather.hourly[7].weather[0].icon.charAt(2) === "d" ? true : false
                    }
                ],
            }))

    }

    // Get current location weather on page load
    useEffect(() => {
        getCurrentLocation()
            .then(coordinates => getWeatherDataFromCoordinates(coordinates.lat, coordinates.lon))
            .catch(() => setWeatherData({
                ...weatherData,
                error: true,
                errorCode: 1000
            }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // If weather data can actually be retrieved, set the appropriate background
    if (weatherData.current.weatherId !== null) {
        getBackground(weatherData.current.weatherId, weatherData.current.day);
    }


    // Search suggestion code is shown below

    const cities = [];

    // Store data from cities.json in cities array
    data.map((location, key) =>
        cities.push({
            key: key,
            city: location.city,
            country: location.country
        })
    );
    
    /* When searchText is changed, check that length is greater than 2 characters.
    If search text is longer than 2 character the cities array is filtered to show
    possible matches. Matches are stored in suggestionsLong which is then truncated
    to the top 10 suggestions */
    useEffect(() => {
        if (searchText.length > 2) {
            // Only show suggestions if search text at least 3 characters long
            const suggestionsLong = cities.filter(function (location) {
                const city = location.city.toLowerCase();
                const country = location.country.toLowerCase();
                const query = searchText.toLowerCase();
                return city.includes(query) ||
                    country.includes(query) ||
                    (city + " " + country).includes(query) ||
                    (country + " " + city).includes(query) ||
                    (city + ", " + country).includes(query);
            });
            setSuggestions(suggestionsLong.slice(0, 10));
        } else {
            setSuggestions([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText])

    function selectSuggestion(event) {
        setSearchText(event.target.innerText);
    }

    return (
        <div>
            <Search 
                searchText={searchText}
                handleChange={handleSearchChange}
                suggestions={suggestions}
                handleClick={selectSuggestion}
                submit={submitSearch}
            />
            <AlertContainer
                errorCode={weatherData.errorCode}
            />
            <MainWeather 
                weatherData={weatherData} />
        </div>
    )
}

export default Container;