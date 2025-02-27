import { useState } from 'react'

const App = (props) => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567'},
    { name: 'The Tester', phone: '123456789'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [show, setShow] = useState(true)

  const guh = (event) => {
    event.preventDefault()
    
    if (persons.some(n => n.name === newName)) {
      alert(newName + " is already added")
    }
    else {
      setPersons(persons.concat({name: newName, phone: newNumber}))
    }
  }

  const thingsToShow = show ? persons : persons.filter(person => person.name.toLowerCase().match(newFilter.toLowerCase()))

  const handlenamechange = (event) => {
    setNewName(event.target.value)
  }

  const handlephonechange = (event) => {
    setnewNumber(event.target.value)
  }
  
  const handlefilterchange = (event) => {
    if (event.target.value !== "") {
      setShow(false)
    }
    else {
      setShow(true)
    }
    setnewFilter(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        data filter: <input value={newFilter} onChange={handlefilterchange}/>  
      </div>
      <h2>Add</h2>
      <form onSubmit={guh}>
        <div>
          name: <input value={newName} onChange={handlenamechange}/><br></br>
          phone number: <input value={newNumber} onChange={handlephonechange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{thingsToShow.map(person => (
        <li key={person.name}>{person.name} {person.phone}</li>
      ))}
      </div>
    </div>
  )
}

export default App