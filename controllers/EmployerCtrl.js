const Employer = require('../models/Employer')

class EmployerCtrl {
  static getEmployers (req, res, next) {
    if (req.params.employerId) {
      Employer.findOne({
          _id: req.params.employerId
        })
        .then((employer) => {
          res.status(200).json(employer)
        })
    } else {
      Employer.find({})
        .then((employers) => {
          res.status(200).json(employers)
        })
    }
  }

  static updateEmployer (req, res, next) {
    Employer.findOneAndUpdate({
        _id: req.params.employerId
      }, req.body, {new: true, runValidators: true})
      .then((updated) => {
        if (updated) {
          res.status(200).json(updated)
        } else {
          res.status(204).json()
        }
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }

  static postEmployer (req, res, next) {
    Employer.create(req.body)
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  //
  // static deleteEmployer (req, res, next) {
  //   Employer.findOneAndRemove({
  //       _id: new ObjectId(req.params.employerId)
  //     })
  //     .then((value) => {
  //       res.status(200).json(value);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(400).json(err);
  //     })
  // }

}

module.exports = EmployerCtrl;
