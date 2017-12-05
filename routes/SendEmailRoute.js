const express = require('express');
const router = express.Router();
const SendEmailCtrl = require('../controllers/SendEmailCtrl');

router.post('/', SendEmailCtrl)

module.exports = router
