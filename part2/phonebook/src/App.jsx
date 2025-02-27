import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const guh = (event) => {
    event.preventDefault()
    setPersons(persons.concat({"name" : newName}))
  }

  const handleguhchange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={guh}>
        <div>
          name: <input value={newName} onChange={handleguhchange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => (
        <li key={person.name}>{person.name}</li>
      ))}</div>
    </div>
  )
}

export default App