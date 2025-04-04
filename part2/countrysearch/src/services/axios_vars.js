import axios from 'axios'
const web_url = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weather_url = 'https://api.openweathermap.org/data/2.5/'
const api_key = import.meta.env.KEY

const getCountry = (name) => {
    return axios.get(web_url + "name/" + name)
}

const getAll = () => {
    return axios.get(web_url + "all")
}

const getWeather = (cityName) => {
    return axios.get(weather_url + "weather?q=" + cityName + "&appid=" + api_key)
}

export default {getCountry, getAll, getWeather}    

