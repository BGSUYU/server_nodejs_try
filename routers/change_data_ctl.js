const express = require('express');
const router = express.Router();
const change_data_person = require('../controler/change_data/change_data_person');
const change_data_car=require('../controler/change_data/change_data_car')
const change_data_db_user=require('../controler/change_data/change_data_db_user')

// POST路由，用于修改用户和车辆信息
router.post('/change_data_person', change_data_person.change_data);
router.post('/change_data_car',change_data_car.change_data);
router.post('/change_data_db_user',change_data_db_user.change_data)

module.exports = router;