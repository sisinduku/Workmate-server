const express = require('express')
const router = express.Router()

const EmployerCtrl = require('../controllers/EmployerCtrl')

router.get('/get_employer/:employerId?', EmployerCtrl.getEmployers)
router.put('/update_employer/:employerId', EmployerCtrl.updateEmployer)
router.post('/post_employer', EmployerCtrl.postEmployer)
// router.get('/get_employer/', EmployerCtrl.getEmployers)
// router.delete('/delete_employer/:employerId', EmployerCtrl.deleteEmployer)

module.exports = router
