require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const Phone = require('./models/phone')

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', function getData (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time :body'));

/*
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
];

*/
const genID = () => {
  return Math.floor(Math.random() * (Math.floor(9999) - Math.ceil(5)) + Math.ceil(5));
}
  
app.get('/api/persons', (request, response) => {
  Phone.find({}).then(phones => {
    response.json(phones)
  })

})

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id).then(phone => {
    if (phone) {
      response.json(phone)
    }
    else {
      response.status(404).end()
    }

  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))

  /*
  const id = request.params.id;
  phone_data = phone_data.filter(person => person.id !== id);
  response.status(204).end();
  */
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'data missing'
    })
  }

  /*
  if (phone_data.find(phones => phones.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })

  }
  */
  const person = new Phone({
    name: body.name,
    number: body.number
  })
  /*
  const person = {
    id: genID().toString(),
    name: body.name,
    number: body.number,
  };

  phone_data = phone_data.concat(person);
  */

  person.save().then(savedperson => {
    response.json(savedperson)
  })

})
/*
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phone.findById(request.params.id)
    .then(phone => {
      if (!phone) {
        return response.status(404).end()
      }

      phone.name = name
      phone.number = number

      return phone.save().then((updatedPhone) => {
        response.json(updatedPhone)
      })
    })
    .catch(error => next(error))
})
*/
app.get('/info', (request, response) => {
    const date = new Date();

    Phone.estimatedDocumentCount().then(count => {
      response.send("<p>Phonebook has info for " + count + " people</p>" + date.toString());
    })


})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' }) 
  }
  else {
    return response.status(500).end()
  }
  next(error)

}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})