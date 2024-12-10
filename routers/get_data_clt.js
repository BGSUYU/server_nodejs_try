const express = require('express');
const router = express.Router();
const get_data_user = require('../controler/get_data/get_data_user');
const get_data_car = require('../controler/get_data/get_data_car');

// post路由，用于校验是否login成功
router.post('/get_data_user', get_data_user.gets);
router.post('/get_data_car', get_data_car.gets);

module.exports = router;