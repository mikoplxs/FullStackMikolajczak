import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/phonebooks'

const Filter = (props) => {

  return (  
  <div>
    data filter: <input value={props.filter} onChange={props.filterchange}/>  
  </div>
)

}

const PersonForm = (props) => {

  return (  
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handlenamechange}/><br></br>
      phone number: <input value={props.newNumber} onChange={props.handlephonechange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

}

const PersonList = (props) => {

  return (
    <div>{props.finalpeople.map(person => (
      <li key={person.name}>{person.name} {person.phone}</li>
    ))}
    </div>
  )

}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [show, setShow] = useState(true)


  useEffect(() => {
    phoneService.getAll().then(response => {
      console.log("DONE")
      setPersons(response.data)
    })

  }, [])

  
  const handlefilterchange = (event) => {
    if (event.target.value !== "") {
      setShow(false)
    }
    else {
      setShow(true)
    }
    setnewFilter(event.target.value)

  }

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(n => n.name === newName)) {
      alert(newName + " is already added")
    }
    else {
      //setPersons(persons.concat({name: newName, phone: newNumber}))
      phoneService.addData({name: newName, phone: newNumber})
      .then(response => {
        setPersons(persons.concat(response.data))
      })

    }
  }

  const handlenamechange = (event) => {
    setNewName(event.target.value)
  }

  const handlephonechange = (event) => {
    setnewNumber(event.target.value)
  }
  

  const thingsToShow = show ? persons : persons.filter(person => person.name.toLowerCase().match(newFilter.toLowerCase()))

  const PersonFormProps = {
    addPerson,
    newName,
    newNumber,
    handlenamechange,
    handlephonechange

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} filterchange={handlefilterchange}/>
      <h2>Add</h2>
      <PersonForm {...PersonFormProps}/>
      <h2>Numbers</h2>
      <PersonList finalpeople={thingsToShow} />
    </div>
  )
}

export default App