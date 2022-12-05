const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storate: 'homework.db'
})

const Student = sequelize.define('student', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  age: Sequelize.INTEGER
}, {
  timestamps: false
})

const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res) => {
  try {
    await sequelize.sync({ force: true })
    for (let i = 0; i < 10; i++) {
      const student = new Student({
        name: 'name ' + i,
        address: 'some address on ' + i + 'th street',
        age: 30 + i
      })
      await student.save()
    }
    res.status(201).json({ message: 'created' })
  } catch (err) {
    console.warn(err.stack)
    res.status(500).json({ message: 'server error' })
  }
})

app.get('/students', async (req, res) => {
    try {
      const students = await Student.findAll()
      res.status(200).json(students)
    } catch (err) {
      console.warn(err.stack)
      res.status(500).json({ message: 'server error' })
    }
  })

app.post('/students', async (req, res) => {
    try {
      keyBody = {
        ...req.body
      }
      const keysRequest = Object.keys(keyBody);
        
    if (!keysRequest.length) return res.status(400).json({message: 'body is missing'});   
    if (isMalformedReq(keysRequest)) return res.status(400).json({message: 'malformed request'});
    if ( keyBody.age < 1 ) return res.status(400).json({message: 'age should be a positive number'});
    const stud = new Student({
       ...keyBody
    })
    await stud.save()
    res.status(201).json({message: 'created'});
} catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: 'error 500' })
    }
})


function isMalformedReq(keysRequest) {
    let studentColumns = ['id','name', 'address', 'age'];
    return keysRequest.every(key => studentColumns.includes(key)) == false || keysRequest.length != 3
}
module.exports = app
