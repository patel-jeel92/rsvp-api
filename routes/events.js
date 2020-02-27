const express = require('express')
const router = express.Router()
const EVENT = require('../models/event')


// Get one event
router.get('/:id', getEvent, (req, res) => {
    res.json(res.event);
})

async function getEvent(req, res, next) {
    try {
      event = await EVENT.findById(req.params.id)
      if (event == null) {
        return res.status(404).json({ message: 'Cant find event'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.event = event
    next()
  }

module.exports = router