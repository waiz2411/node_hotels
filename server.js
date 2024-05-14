const express = require('express')
const app = express()
const db = require('./db')



const PORT = process.env.PORT || 3000


const bodyParser = require('body-parser')
app.use(bodyParser.json())


// middleware function
const logRequest = (req, res, next)=>{
  console.log(`{${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
}


app.get('/', logRequest, function (req, res) {
  res.send("Welcome to my hotel")
})


//Import the router files
const personRoutes = require('./routes/person-routes')
const menuItemRoutes = require('./routes/menuItem-routes')

// Use the router
app.use('/persons', personRoutes)
app.use('/menu', menuItemRoutes)



app.listen(PORT, ()=>{
  console.log('listening on port 3000')
})