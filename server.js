require('dotenv').config()


const express = require('express')
var cors = require('cors');
const app = express()
app.use(cors());
const mongoose = require('mongoose')
const RSVP = require('./models/rsvp')
const EVENT = require('./models/event')
const ObjectId = mongoose.Types.ObjectId;
const seeder = require('./seed/seeder.js');

// connect to the database.
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))

db.once('open', () => {
    seeder.seed(db, 'events', EVENT);
    seeder.seed(db, 'rsvps', RSVP)
})


app.use(express.json())

const rsvpRouter = require('./routes/rsvps');
const eventRouter = require('./routes/events')

app.use('/rsvp', rsvpRouter);
app.use('/event', eventRouter);

app.listen(3000, () => console.log('server started'))