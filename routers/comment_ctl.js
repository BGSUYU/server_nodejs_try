const express = require('express');
const router = express.Router();
const comment = require('../controler/change_data/submit_comment');

// POST路由，用于创建新用户
router.post('/comment', comment.comments);

module.exports = router;