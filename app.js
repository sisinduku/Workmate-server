const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const SearchPersonalityRoute = require('./routes/SearchPersonalityRoute');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

require('dotenv').config()
const job_seeker = require('./routes/JobSeekerRoute');
app.use('/job_seekers', job_seeker)
app.use('/search_personality', SearchPersonalityRoute)

module.exports = app
