const mongoose = require('mongoose')

mongoose.connection.openUri(`${process.env.APPDB}_${process.env.NODE_ENV}_db`, (err) => {
  if (err) {
    console.log(err);
  }
})

const Schema = mongoose.Schema
const jobSeekerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  education: [
    {
      type: String,
      required: true
    }
  ],
  skills: [
    {
      type: String,
      required: true
    }
  ],
  executive_summary: {
    type: String,
    required: true
  },
  personality_insight: String,
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('JobSeekers', jobSeekerSchema)
