import axios from 'axios'
const JSON_url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(JSON_url)
}

const addData = object => {
    return axios.post(JSON_url, object)
}

const deleteRecord = (id_num) => {
    return axios.delete(JSON_url+"/"+id_num)
}

export default {getAll, addData, deleteRecord}    

