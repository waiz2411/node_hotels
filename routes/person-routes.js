const express = require('express')
const router = express.Router()
const person = require('./../models/person')


router.post('/', async(req, res)=> {
    try{
      const data = req.body //Assuming the request body contains the person data
      // Create a new Person document using the mongoose model
      const newPerson = new person(data);
      // newPerson.name = data.name
      // newPerson.age = data.age
      // newPerson.mobile = data.mobile
      // newPerson.email = data.email
      // newPerson.address = data.address
  
      //Save the new person to the database
      const response = await newPerson.save()
      console.log('data saved')
      res.status(200).json(response)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal server error'})
    }
})

//get persons
router.get('/', async (req, res) =>{
    try{
      const data = await person.find()
      console.log('data fetched')
      res.status(200).json(data)
    }catch(err){
      console.log(err)
      res.status(500).json({error:'Internal server error'})
    }
})


router.get('/:workType', async (req,res)=>{
    try{
      const workType = req.params.workType;
      if(workType =='chef' || workType == 'manager' || workType =='waiter'){
        const response = await person.find({work : workType});
        console.log('response fetched')
        res.status(200).json(response)
      }else{
        res.status(404).json({error: 'Invalid work type'})
      }
    }catch(err){
      console.log(err)
      res.status(500).json({error:'Internal server error'})
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id
        const updatedPersonData = req.body

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidator: true,
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found'})
        }

        console.log('data updated')
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(404).json({error:'Internal server error'})
    }
})


router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id
        const response = await person.findByIdAndDelete(personId)
    
        if (!response) {
            return res.status(404).json({ error: 'Person not found'})
        }
        console.log('data deleted')
        res.status(200).json({message : 'person deleted successfully`'})
    }catch(err){
        console.log(err)
        res.status(404).json({error:'Internal server error'})
    }
})


module.exports = router