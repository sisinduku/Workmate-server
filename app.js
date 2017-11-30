const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

require('dotenv').config()
const job_seeker = require('./routes/JobSeekerRoute');
app.use('/job_seekers', job_seeker)

module.exports = app
