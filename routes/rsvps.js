const express = require('express')
const router = express.Router()
const RSVP = require('../models/rsvp')


// Get all rsvps
router.get('/',  async(req, res) => {
    try {
        const rsvps = await RSVP.find()
        const grahShantiGuests =[]
        const sangeetGuests =[]
        const weddingGuests =[]
        const receptionGuests =[]
        if(req.query.count){
            rsvps.forEach(x => {
                var grahShantiAttendingGuests = x.guests.filter(guest => guest.eventsAttending.includes('5e4dead188ff6f204adc56a3'))
                var sangeetAttendingGuests = x.guests.filter(guest => guest.eventsAttending.includes('5e4deb1988ff6f204adc56b9'))
                var weddingAttendingGuests = x.guests.filter(guest => guest.eventsAttending.includes('5e4deb5e88ff6f204adc56ce'))
                var receptionAttendingGuests = x.guests.filter(guest => guest.eventsAttending.includes('5e4deb7088ff6f204adc56d7'))

                if(grahShantiAttendingGuests.length > 0){
                    grahShantiAttendingGuests.forEach(x => grahShantiGuests.push(x));
                }
                if(sangeetAttendingGuests.length > 0){
                    sangeetAttendingGuests.forEach(x => sangeetGuests.push(x));
                }
                if(weddingAttendingGuests.length > 0){
                    weddingAttendingGuests.forEach(x => weddingGuests.push(x));
                }
                if(receptionAttendingGuests.length > 0){
                    receptionAttendingGuests.forEach(x => receptionGuests.push(x));
                }
            })
            res.json({'Grah Shanti':grahShantiGuests.length, 'Sangeet':sangeetGuests.length, 'Wedding':weddingGuests.length, 'Reception':receptionGuests.length})
        }
        else{
            res.json(rsvps)
        }
        
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Get one rsvp
router.get('/:code', getRSVP, (req, res) => {
    res.json(res.rsvp);
})

// Update one rsvp
router.put('/:code', getRSVP,  async (req, res) => {
    try{
        var updatedObject = req.body;
        let rsvp = await RSVP.findOneAndUpdate({code:req.params.code}, updatedObject, {new: true})
        res.json(rsvp);
    }
    catch{
        res.status(400).json({ message: err.message })
    }

})

async function getRSVP(req, res, next) {
    try {
      rsvp = await RSVP.findOne({code: req.params.code})
      if (rsvp == null) {
        return res.status(404).json({ message: 'Cant find rsvp'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.rsvp = rsvp
    next()
  }

module.exports = router