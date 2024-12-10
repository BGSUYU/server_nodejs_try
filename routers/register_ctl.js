const express = require('express');
const router = express.Router();
const register = require('../controler/register');

// POST路由，用于创建新用户
router.post('/register', register.createUser);

module.exports = router;