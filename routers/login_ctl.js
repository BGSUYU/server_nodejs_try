const express = require('express');
const router = express.Router();
const login = require('../controler/login');

// post路由，用于校验是否login成功
router.post('/login', login.verify);

module.exports = router;