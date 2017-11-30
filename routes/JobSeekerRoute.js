const express = require('express')
const router = express.Router()
const JobSeekerCtrl = require('../controller/JobSeekerCtrl')

router.post('/', JobSeekerCtrl.create)
router.get('/:id', JobSeekerCtrl.findById)
router.put('/:id', JobSeekerCtrl.update)

module.exports = router
