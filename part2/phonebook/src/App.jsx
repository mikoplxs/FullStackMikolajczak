import { useState } from 'react'

const Filter = (props) => {

  const handlefilterchange = (event) => {
    if (event.target.value !== "") {
      props.showfilter(false)
    }
    else {
      props.showfilter(true)
    }
    props.setfilter(event.target.value)

  }
  return (  
  <div>
    data filter: <input value={props.filter} onChange={handlefilterchange}/>  
  </div>
)

}

const PersonForm = (props) => {
  
  const handlenamechange = (event) => {
    props.setNewName(event.target.value)
  }

  const handlephonechange = (event) => {
    props.setnewNumber(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    
    if (props.persons.some(n => n.name === props.newName)) {
      alert(props.newName + " is already added")
    }
    else {
      props.setPersons(props.persons.concat({name: props.newName, phone: props.newNumber}))
    }
  }


  return (  
  <form onSubmit={addPerson}>
    <div>
      name: <input value={props.newname} onChange={handlenamechange}/><br></br>
      phone number: <input value={props.newnumber} onChange={handlephonechange}/>
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

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567'},
    { name: 'The Tester', phone: '123456789'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [show, setShow] = useState(true)


  const thingsToShow = show ? persons : persons.filter(person => person.name.toLowerCase().match(newFilter.toLowerCase()))

  const PersonFormProps = {
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setnewNumber
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} setfilter={setnewFilter} showfilter={setShow}/>
      <h2>Add</h2>
      <PersonForm {...PersonFormProps}/>
      <h2>Numbers</h2>
      <PersonList finalpeople={thingsToShow} />
    </div>
  )
}

export default App