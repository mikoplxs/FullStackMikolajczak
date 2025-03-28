import axios from 'axios'
const web_url = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getCountry = (name) => {
    return axios.get(web_url + "name/" + name)
}

const getAll = () => {
    return axios.get(web_url + "all")
}

export default {getCountry, getAll}    

