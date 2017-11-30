const express = require('express')
const router = express.Router()
const JobSeekerCtrl = require('../controllers/JobSeekerCtrl')

router.post('/', JobSeekerCtrl.create)
router.get('/:id', JobSeekerCtrl.findById)
router.put('/:id', JobSeekerCtrl.update)
router.delete('/:id', JobSeekerCtrl.delete)

module.exports = router
