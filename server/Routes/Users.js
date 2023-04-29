const express = require('express');
const router = express.Router();
const User = require('../models/Users')

// Get All Users route
router.get('/', async (req, res) => {
  const user = await User.find();
  res.json(user)
})

// Create new User
router.post('/new', async (req, res) => {
  
  const newUser = new User(
     req.body // What the Vue App is sending  
  ); 
  const savedUser = await newUser.save() // mongo save method
  res.json(savedUser) // respond with json to our post endpoint
});

// Getter by id
router.get('/get/:id', async (req, res) => {
  const t = await User.findById({ _id : req.params.id })
  res.json(t)
})

// Delete a user by id
router.delete('/delete/:id', async (req, res) => {
  const tDelete = await User.findByIdAndDelete({ _id : req.params.id })
  res.json(tDelete)
})

// Update a user by id
router.put('/update/:id', async (req, res) => {
  const tUpdate = await User.updateOne(
    { _id: req.params.id }, 
    { $set: req.body }
  )
  res.json(tUpdate)
})



module.exports = router