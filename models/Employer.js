const mongoose = require('mongoose')
const crypto = require('crypto')
const Redis = require('../lib/Redis');
const Schema = mongoose.Schema;

const DB_HOST = process.env.DB_HOST || `${process.env.APPDB}_${process.env.NODE_ENV}_db`;

mongoose.Promise = global.Promise
mongoose.connection.openUri(DB_HOST, (err) => {
  if (err) {
    console.log(err);
  }
})

let employerSchema = new Schema({
  name: {
    type: String,
    required: '{PATH} is required'
  },
  email: String,
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

employerSchema.pre('findOneAndUpdate', function (next) {
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
      next(reason)
    })
})

employerSchema.post('save', function(doc){
  Redis.set(doc._id.toString(), doc)
})

employerSchema.post('findOneAndUpdate', function(doc){
  Redis.del(this._conditions._id.toString())
  Redis.set(this._conditions._id.toString(), this._update)
})

module.exports = mongoose.model('Employer', employerSchema)
