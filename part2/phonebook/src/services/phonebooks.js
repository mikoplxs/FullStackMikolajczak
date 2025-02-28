import axios from 'axios'
const JSON_url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(JSON_url)
}

const addData = object => {
    return axios.post(JSON_url, object)
}

export default {getAll, addData}    

