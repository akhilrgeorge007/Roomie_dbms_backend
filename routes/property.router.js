const express = require('express');
const router = express.Router();
const { getPropertyCostController, getavailPropertyController,getPropertyByIdController } = require('../controllers/property.controller')

router.get('/availproperty', getavailPropertyController);
router.get('/propertyCost/:id',getPropertyCostController);
router.get('/:id',getPropertyByIdController)

module.exports = router;