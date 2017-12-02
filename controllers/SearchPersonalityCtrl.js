const JobSeeker = require('../models/JobSeeker')
const similarityPersonality = require('../lib/similarityPersonality')

class SearchPersonalityCtrl {
  static postSearchPersonality (req, res, next) {
    JobSeeker.find({personality_insight: {$ne: null}})
      .then(jobseekers => {
        let result = []
        jobseekers.forEach(jobSeeker => {
          let similarity = similarityPersonality(req.body, JSON.parse(jobSeeker.personality_insight))
          result.push({jobSeeker, similarity})
        })
        result.sort((a, b) => b.similarity - a.similarity)
        if (req.body.hasOwnProperty('min_criteria')) {
          result = result.filter(element => element.similarity >= parseFloat(req.body.min_criteria))
        }
        res.status(200).json(result)
      })
      .catch(reason => {
        res.status(400).send(reason)
      })
  }
}

module.exports = SearchPersonalityCtrl;
