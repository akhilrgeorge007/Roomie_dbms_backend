const express = require('express');
const router = express.Router();
const {getTenantsController, registerTenantController,loginTenantController,getTenantById,rentpropertyController}  = require('../controllers/tenant.controller');
const {getPropertyController}  = require('../controllers/property.controller');

router.get('/',getTenantsController);
router.get('/availproperty', getPropertyController);
router.get('/:id',getTenantById);
router.post('/rentproperty/:id',rentpropertyController)
router.post('/register',registerTenantController);
router.post('/login',loginTenantController);



module.exports = router;
