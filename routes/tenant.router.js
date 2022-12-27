const express = require('express');
const router = express.Router();
const {getTenantsController, registerTenantController,loginTenantController,getTenantById,rentpropertyController,getrentpropertyByidContorller,getTenantByPropertyId}  = require('../controllers/tenant.controller');

router.get('/',getTenantsController);
router.get('/:id',getTenantById);
router.get('/rent/:id',getrentpropertyByidContorller);
router.get('/rentproperty/:id',getTenantByPropertyId);//property id
router.post('/rentproperty/:id',rentpropertyController)//tenant id
router.post('/register',registerTenantController);
router.post('/login',loginTenantController);



module.exports = router;
