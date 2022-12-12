const express = require('express');
const router = express.Router();
const { getPropertyCostController, getavailPropertyController } = require('../controllers/property.controller')

router.get('/availproperty', getavailPropertyController);
router.get('/propertyCost/:id',getPropertyCostController);

module.exports = router;