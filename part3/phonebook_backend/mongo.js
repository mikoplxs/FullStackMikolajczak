const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mikoplxs:${password}@cluster0.esnsr74.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length > 3) {

  const phone = new Phone({
    name: process.argv[3],
    number: process.argv[4],
  })

  phone.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}

if (process.argv.length == 3) {
  Phone.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(phone => {
      console.log(phone.name + " " + phone.number)
    })
    mongoose.connection.close()
  })
}