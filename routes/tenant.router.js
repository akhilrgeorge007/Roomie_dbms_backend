const express = require('express');
const router = express.Router();
const {getTenantsController, registerTenantController,loginTenantController,getTenantById}  = require('../controllers/tenant.controller');
const {getPropertyController}  = require('../controllers/property.controller');

router.get('/',getTenantsController);
router.get('/availproperty', getPropertyController);
router.get('/:id',getTenantById);
router.post('/register',registerTenantController);
router.post('/login',loginTenantController);



module.exports = router;
