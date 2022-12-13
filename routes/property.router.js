const express = require('express');
const router = express.Router();
const { getPropertyCostController, getavailPropertyController,getPropertyByIdController,getPropertyByOwnerIdController } = require('../controllers/property.controller')

router.get('/availproperty', getavailPropertyController);
router.get('/propertyCost/:id',getPropertyCostController);
router.get('/:id',getPropertyByIdController)
router.get('/owner/:id',getPropertyByOwnerIdController)

module.exports = router;