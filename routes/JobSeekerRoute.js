const express = require('express')
const router = express.Router()
const JobSeekerCtrl = require('../controller/JobSeekerCtrl')

router.post('/', JobSeekerCtrl.create)


module.exports = router
