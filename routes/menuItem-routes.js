const express = require('express')
const router = express.Router()
const menuItem = require('../models/menuItem.js')




  
  
  
  
  
router.post('/', async(req,res) =>{
    try{
      const menuData = req.body
      const newItem = new menuItem(menuData);
  
      const menuResponse = await newItem.save()
      console.log('menu item saved')
      res.status(200).json(menuResponse)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal server error'})
    }
})
  


router.get('/', async (req, res) =>{
    try{
      const menuData = await menuItem.find()
      console.log('data fetched')
      res.status(200).json(menuData)
    }catch(err){
      console.log(err)
      respond.status(500).json({error:'Internal server error'})
    }
})

router.get('/:taste', async (req, res) =>{
    try{
        const tasteType = req.params.taste
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await menuItem.find({taste : tasteType})
            console.log('response fetched')
            res.status(200).json(response)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
})



module.exports = router