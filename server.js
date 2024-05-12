const express = require('express')
const app = express()
const db = require('./db')



const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.send("Welcome")
})


//Import the router files
const personRoutes = require('./routes/person-routes')
const menuItemRoutes = require('./routes/menuItem-routes')

// Use the router
app.use('/persons', personRoutes)
app.use('/menu', menuItemRoutes)



app.listen(3000, ()=>{
  console.log('listening on port 3000')
})