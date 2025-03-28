import { useState, useEffect } from 'react'
import axios from 'axios'
import axios_vars from "./services/axios_vars"

const Finder = (props) => {

  return (  
  <div>
    find countries: <input value={props.filter} onChange={props.finderchange}/>  
  </div>
  )
}

function App() {
  const [countries, setcountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newFilter, setnewFilter] = useState('')
  const [show, setShow] = useState(false)
  const [info, setInfo] = useState('')

  useEffect(() => {
    axios_vars.getAll().then(response => {
      setcountries(response.data)
    })

  }, [])

  const filteredcountries = show && countries.filter(country => country.name.common.toLowerCase().match(newFilter.toLowerCase())).length<=10 ?
   countries.filter(country => country.name.common.toLowerCase().match(newFilter.toLowerCase())) :
   []

  const information = newFilter!='' && countries.filter(country => country.name.common.toLowerCase().match(newFilter.toLowerCase())).length>10 ?
   "Too many matches" :
    "" 

  const handlefinderchange = (event) => {
    if (event.target.value !== "") {
      setShow(true)
    }
    else {
      setShow(false)
    }
    setnewFilter(event.target.value)
  }


  return (
    <div>
      <Finder filter={newFilter} finderchange={handlefinderchange}/>
      <div>{filteredcountries.map(country => (
        <li key={country.cca2}>{country.name.common}</li>
      ))}
      {information}
      </div>

    </div>
  )

}

export default App
