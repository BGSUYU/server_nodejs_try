const express = require('express');
const router = express.Router();
const comment = require('../controler/chemera/submit');

// POST路由，用于创建新用户
router.post('/chemera', submit.submits);

module.exports = router;