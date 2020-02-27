const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    eventsInvitedTo:{
        type: Array,
        required: true
    },
    guests: {
        type: Array,
    },
    code:{
        type:String,
        required:true
    },
    submitted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('rsvp', rsvpSchema)