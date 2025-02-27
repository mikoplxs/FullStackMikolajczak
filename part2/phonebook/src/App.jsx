import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'},
    { phone: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')

  const guh = (event) => {
    event.preventDefault()
    
    if (persons.some(n => n.name === newName)) {
      alert(newName + " is already added")
    }
    else {
      setPersons(persons.concat({"name" : newName}, {"phone" : newNumber}))
    }
  }

  const handlenamechange = (event) => {
    setNewName(event.target.value)
  }

  const handlephonechange = (event) => {
    setnewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <div>{persons.map(person => (
        <li key={person.name}>{person.name}{person.phone}</li>
      ))}
      </div>
    </div>
  )
}

export default App