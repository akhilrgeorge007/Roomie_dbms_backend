const express = require('express');
const router = express.Router();
const {getTenantsController, registerTenantController,loginTenantController,getTenantById,rentpropertyController}  = require('../controllers/tenant.controller');

router.get('/',getTenantsController);
router.get('/:id',getTenantById);
router.post('/rentproperty/:id',rentpropertyController)
router.post('/register',registerTenantController);
router.post('/login',loginTenantController);



module.exports = router;
