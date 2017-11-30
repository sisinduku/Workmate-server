const mongoose = require('mongoose')
const crypto = require('crypto')

const Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connection.openUri(`${process.env.APPDB}_${process.env.NODE_ENV}_db`, (err) => {
  if (err) {
    console.log(err);
  }
})

let employerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  company: String,
  location: String,
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

employerSchema.pre('save', function (next) {
  this.password = crypto.createHash('md5').update(this.password).digest('hex')
  next()
})

employerSchema.pre('findOneAndUpdate', function(next) {
  this.updateOne({
      _id: this._conditions._id
    }, {
      updatedAt: Date.now()
    })
    .then(() => {
      next()
    })
    .catch(reason => {
      console.log(reason)
    })
})


module.exports = mongoose.model('Employer', employerSchema)
