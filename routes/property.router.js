const express = require('express');
const router = express.Router();
const { getPropertyCostController } = require('../controllers/property.controller')


router.get('/propertyCost/:id',getPropertyCostController);

module.exports = router;