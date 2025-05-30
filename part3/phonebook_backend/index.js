const express = require('express')
const app = express()

app.use(express.json())

let phone_data = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

const genID = () => {
  return Math.floor(Math.random() * (Math.floor(9999) - Math.ceil(5)) + Math.ceil(5))
}

app.get('/', (request, response) => {
    response.send("<h2>guh</h2>")
  })
  
app.get('/api/persons', (request, response) => {
  response.json(phone_data)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phone_data.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phone_data = phone_data.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const guh = request.body

  //if (!body.name || !body.number) {
  //  return response.status(400).json({
  //    error: 'data missing'
  //  })
  //}
  
  //const person = {
  //  id: genID(),
  //  name: body.name,
  //  number: body.number
  //}

  //phone_data = phone_data.concat(person)
  console.log(guh)
  response.json(guh)

})


app.get('/info', (request, response) => {
    const date = new Date()

    response.send("<p>Phonebook has info for " + phone_data.length + " people</p>" + date.toString())

})
  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})