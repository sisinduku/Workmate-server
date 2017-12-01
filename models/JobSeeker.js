const mongoose = require('mongoose')
const JobSeekerRedis = require('../lib/JobSeekerRedis');

mongoose.Promise = global.Promise
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
  educations: [
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

jobSeekerSchema.post('save', function(doc){
  // console.log('im here');
  JobSeekerRedis.set(doc._id.toString(), doc)
})

jobSeekerSchema.post('findOneAndRemove', function(doc){
  // console.log('im here');
  JobSeekerRedis.del(doc._id.toString())
})

jobSeekerSchema.post('findOneAndUpdate', function(doc){
  JobSeekerRedis.del(this._conditions._id.toString())
  JobSeekerRedis.set(this._conditions._id.toString(), this._update)
  // console.log('im here update',this._conditions._id,' data ', this._update);
})

// jobSeekerSchema.pre('findOne', async function(next, done){
//   let self=this
//   redis = await JobSeekerRedis.get(self._conditions._id.toString())
//   if (redis !== null) {
//     console.log('im redis', redis);
//     // return redis
//     done()
//     // next(redis)
//   } else {
//     next()
//   }
// })

module.exports = mongoose.model('JobSeeker', jobSeekerSchema)
