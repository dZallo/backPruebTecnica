const flightController = require('../controllers/Flight')
const express = require('express')
const router = express.Router()

router.get('/', flightController.getMostEconomicFiveFligth)

module.exports = router