const express = require('express')
const app = express()
const db = require('./db')
require ('dotenv').config()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person = ('./models/person')


const PORT = process.env.PORT || 3000


const bodyParser = require('body-parser')
app.use(bodyParser.json())


// middleware function
const logRequest = (req, res, next) => {
  console.log(`{${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Call next to pass control to the next middleware function
};



app.use(logRequest)


app.use(new LocalStrategy(async (USERNAME, password, done) =>{
  try{
    console.log('Received credentials:', USERNAME, password)
    const user = Person.findOne({username: USERNAME})

  
  }catch (err)
}))


app.get('/', function (req, res) {
  res.send("Welcome to my hotel")
})


//Import the router files
const personRoutes = require('./routes/person-routes')
// const menuItemRoutes = require('./routes/menuItem-routes')

const menuItemRoutes = require('./routes/menuItem-routes')

// Use the router
app.use('/persons', personRoutes)
app.use('/menuItems', menuItemRoutes)



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});