const express = require('express');
const router = express.Router();
const {getOwnerController, registerOwnerController,loginOwnerController}  = require('../controllers/owner.controller');

router.get('/',getOwnerController);
router.post('/register',registerOwnerController);
router.post('/login',loginOwnerController)


module.exports = router;