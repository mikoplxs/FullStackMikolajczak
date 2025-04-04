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

const CountryInfo = (props) => {

  console.log(props.onecountry)
  if (props.onecountry.length == 0) {
    return null
  }
  else {
    return (
      <div>
        {props.onecountry.map(country => (
          <li key={country.cca2}>{country.common}</li>
        ))}
      </div>
    )  
  }
}

function App() {
  const [countries, setcountries] = useState([])
  const [newFilter, setnewFilter] = useState('')
  const [show, setShow] = useState(false)
  const [sel_country, setcountry] = useState([])

  useEffect(() => {
    axios_vars.getAll().then(response => {
      setcountries(response.data)
      console.log("downloaded")
    })

  }, [])

  const filteredcountries = show && countries.filter(country => country.name.common.toLowerCase().match(newFilter.toLowerCase())).length<=10 ?
   countries.filter(country => country.name.common.toLowerCase().match(newFilter.toLowerCase())) :
   []

  // else if tenary condition for == 1
  const countrydata = countries.filter(country => country.name.common.toLowerCase().match(newFilter.toLowerCase())).length==1 ? countries.filter(country => country.name.common.toLowerCase().match(newFilter.toLowerCase())) : []

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
      <CountryInfo onecountry={countrydata}/>
      </div>

    </div>
  )

}

export default App
