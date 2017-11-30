const job_seeker = require('../models/JobSeeker');

class JobSeeker {
  static create(req,res){
    job_seeker.create(req.body)
    .then(dataJobSeeker => {
      res.status(200).json({
        message:`profile job seeker created succesfully`,
        data:dataJobSeeker
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = JobSeeker
