const express = require('express');
const router = express.Router();
const {
    getOwnerController, 
    registerOwnerController,
    loginOwnerController,
    addProperty,
    updatePropertyCost,
    getOwnerByIdController,
    deletePropertyController
}  = require('../controllers/owner.controller');

router.get('/',getOwnerController);
router.post('/register',registerOwnerController);
router.post('/login',loginOwnerController)
router.get('/:id',getOwnerByIdController)
router.post('/:id/listproperty',addProperty) // id is owner id

router.put('/:id/updatecost',updatePropertyCost) //id: is property_id

router.delete('/deleteproperty/:id',deletePropertyController)

module.exports = router;