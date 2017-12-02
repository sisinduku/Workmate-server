const express = require('express')
const router = express.Router()

const SearchPersonalityCtrl = require('../controllers/SearchPersonalityCtrl')

router.post('/', SearchPersonalityCtrl.postSearchPersonality)

module.exports = router;
