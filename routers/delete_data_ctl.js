const express = require('express');
const router = express.Router();
const delete_data_car = require('../controler/delete_data/delete_data_car');

// POST路由，用于创建新用户
router.post('/delete_data_car', delete_data_car.delete);

module.exports = router;