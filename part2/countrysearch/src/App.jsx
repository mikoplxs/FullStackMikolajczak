import { useState, useEffect, isValidElement } from 'react'
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

  const [weatherdata, setweatherdata] = useState([])
  const [capital, setcapital] = useState("")

  useEffect(() => {
    if (capital != "") {
      axios_vars.getWeather(capital).then(response => {
        setweatherdata(response.data)
        console.log("got the thing")
      })  
    }

  }, [capital])

  useEffect(() => {
    if (props.onecountry.length == 1 || props.selected.length == 1) {
      const mainarray = props.onecountry.length==1 ? props.onecountry[0] : props.selected[0]
      setcapital(mainarray.capital[0])
    }

  }, [props.onecountry, props.selected])


  if (props.onecountry != [] || props.selected != []) {
    if (props.onecountry.length == 1 || props.selected.length == 1) {

      const mainarray = props.onecountry.length==1 ? props.onecountry[0] : props.selected[0]
      const languages_array = Object.values(mainarray.languages)

      const imagesrc = weatherdata?.weather ? "https://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + "@2x.png" : "test"

      return (
        <div>
          <h1>{mainarray.name.common}</h1>
          <p>Capital {mainarray.capital[0]}<br></br>
          Area {mainarray.area}</p>
          <h2>Languages</h2>
          <ul>
            {languages_array.map(lan => (<li key={lan}>{lan}</li>))}
          </ul>
          <img src={mainarray.flags.png}></img>
          <h2>Weather in {mainarray.capital[0]}</h2>
          <p>Temperature {weatherdata?.main?.temp} Celsius</p>

          <img src={imagesrc}/>
          <p>Wind {weatherdata?.wind?.speed} m/s</p>
        </div>
      )    
  
    }


  }
  else {
    return null
  }

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
