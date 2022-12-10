const express = require('express');
const router = express.Router();
const {getTenantsController, registerTenantController,loginTenantController}  = require('../controllers/tenant.controller');

router.get('/',getTenantsController);
router.post('/register',registerTenantController);
router.post('/login',loginTenantController)


module.exports = router;
