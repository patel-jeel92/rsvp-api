const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true,
    },
    location:{
        type: String
    },
    venue:{
        type:String
    }
})

module.exports = mongoose.model('event', eventSchema)
