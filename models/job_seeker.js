const mongoose = require('mongoose')
mongoose.connection.openUri(`${process.env.app_db_movie}`, (err) => {
  if (err) {
    console.log(err);
  }
})

const Schema = mongoose.Schema

const jobSeekerSchema = new Schema({
  name : String,
  location : String,
  education : String,
  skills : String,
  executive_summary : String,
  persollity_insight : String,
  password: String
})

modeul.exports = mongoose.model('JobSeekers', jobSeekerSchema)
