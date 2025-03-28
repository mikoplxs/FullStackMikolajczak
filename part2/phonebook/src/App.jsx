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

const DeleteButton = (props) => {

  return (
    <view>
      <button onClick={() => props.deleterecord(props.recordid, props.recordname)}>delete</button>
    </view>
  )
}

const PersonList = (props) => {

  return (
    <div>{props.finalpeople.map(person => (
      <li key={person.id}>{person.name} {person.number} <DeleteButton deleterecord={props.deleterecord} recordid={person.id} recordname={person.name}/></li>
    ))}
    </div>
  )

}

const GoodMessage = (props) => {

  if (props.message == null) {
    return null
  }

  return (
    <div className='goodmess'>
      {props.message}
    </div>

  )

}


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [show, setShow] = useState(true)
  const [goodmessage, setgoodmessage] = useState(null)


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
      if (window.confirm(newName + " is already added, replace the old number with the new one?")) {
        const foundperson = persons.find(person => newName == person.name)
        phoneService.updateRecord(foundperson.id, {name: foundperson.name, number: newNumber})
        .then(response => {
          console.log(response.data)
          setPersons(persons.map(person => person.id === foundperson.id ? response.data : person))
          setgoodmessage("Updated " + foundperson.name)
          setTimeout(() => {
            setgoodmessage(null)
          }, 2000)
        })
  
      }
      else {
        console.log("nop")
      }
    }
    else {
      //setPersons(persons.concat({name: newName, phone: newNumber}))
      phoneService.addData({name: newName, number: newNumber})
      .then(response => {
        setPersons(persons.concat(response.data))
        setgoodmessage("Added " + newName)
        setTimeout(() => {
          setgoodmessage(null)
        }, 2000)
      })

    }
  }

  const deleterecord = (recordid, recordname) => {
    if (window.confirm("Delete " + recordname + " ?")) {
      console.log("yah")
      phoneService.deleteRecord(recordid)
      .then(response => {
        setPersons(persons.filter(person => person.id != recordid))
      })
    }
    else {
      console.log("nah")
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
      <GoodMessage message={goodmessage} />
      <PersonForm {...PersonFormProps}/>
      <h2>Numbers</h2>
      <PersonList finalpeople={thingsToShow} deleterecord={deleterecord}/>
    </div>
  )
}

export default App