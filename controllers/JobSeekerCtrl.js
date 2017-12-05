const JobSeeker = require('../models/JobSeeker');
const requestPersonality = require('../lib/requestPersonality');
const crypto = require('crypto')
const Redis = require('../lib/Redis');

class JobSeekerCtrl {
  static create(req,res,next){
    let newPass=crypto.createHash('md5').update(req.body.password).digest('hex');
    req.body.password=newPass
    if (req.body.executive_summary.length<100) {
      res.status(500).send('your executive summary must >= 100')
    } else {
      requestPersonality(req.body.executive_summary)
      .then(personality => {
        req.body.personality_insight = JSON.stringify(personality)
        JobSeeker.create(req.body)
        .then(dataJobSeeker => {
          res.status(200).json(dataJobSeeker)
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  static async findById(req,res){
    let redis = await Redis.get(req.params.id)
    if (redis !== null) {
      res.status(200).json(redis)
    } else {
      JobSeeker.findOne({_id:req.params.id})
      .then(dataJobSeeker => {
        res.status(200).json(dataJobSeeker)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  static update(req,res){
    JobSeeker.findOne({_id:req.params.id})
    .then(async (dataExist) => {
      if (dataExist.executive_summary !== req.body.executive_summary) {
        let promisePersonality = await requestPersonality(req.body.executive_summary)
        req.body.personality_insight = JSON.stringify(promisePersonality)
      }
      JobSeeker.findOneAndUpdate({
          _id:req.params.id
        },req.body,{
          new: true
        }
      )
      .then(dataJobSeeker => {
        res.status(200).json(dataJobSeeker)
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  static delete(req,res){
    JobSeeker.findOneAndRemove({
      _id:req.params.id
    })
    .then(dataJobSeeker => {
      res.status(200).json(dataJobSeeker)
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = JobSeekerCtrl
