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

const InfoButton = (props) => {

  return (
    <view>
      <button onClick={() => props.handleinfobutton(props.data)}>Show</button>
    </view>
  )
}

const CountryInfo = (props) => {

  let mainarray = []
  
  if (props.onecountry.length != 1 && props.selected.length != 1) {
    return null
  }
  else if (props.onecountry.length != 1 && props.selected.length == 1){
    mainarray = props.selected[0]
  } 
  else {
    mainarray = props.onecountry[0]
  }
  const languages_array = Object.values(mainarray.languages)
  return (
    <div>
      <h1>{mainarray.name.common}</h1>
      <p>Capital {mainarray.capital[0]}<br></br>
      Area {mainarray.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages_array.map(lan => (<li>{lan}</li>))}
      </ul>
      <img src={mainarray.flags.png}></img>
    </div>
  )  

}

function App() {
  const [countries, setcountries] = useState([])
  const [newFilter, setnewFilter] = useState('')
  const [show, setShow] = useState(false)
  const [selectedCountry, setSelected] = useState([])

  useEffect(() => {
    axios_vars.getAll().then(response => {
      setcountries(response.data)
      console.log("downloaded")
    })

  }, [])

  const handleinfobutton = (country) => {
    console.log(country)
    setSelected(country)
  }

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
    setSelected([])
  }


  return (
    <div>
      <Finder filter={newFilter} finderchange={handlefinderchange}/>
      <div>{filteredcountries.map(country => (
        <li key={country.cca2}>{country.name.common} <InfoButton data={filteredcountries.filter(selected => selected.cca2 == country.cca2)} handleinfobutton={handleinfobutton}/></li>
      ))}
      {information}
      <CountryInfo onecountry={filteredcountries} selected={selectedCountry}/>
      </div>

    </div>
  )

}

export default App
