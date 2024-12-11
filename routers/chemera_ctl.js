const express = require('express');
const router = express.Router();
const submit_chemera = require('../controler/chemera/submit_chemera');
const delete_chemera = require('../controler/chemera/delete_chemera')

// POST路由，用于创建新用户
router.post('/submit_chemera', submit_chemera.submits);
router.post('/delete_chemera', delete_chemera.deletes);

module.exports = router;