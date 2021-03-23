const express = require('express');
const router = express.Router();

const authorController = require('./../controllers/author.controller');
const { route } = require('./post.route');

// middleware
const validate = require('../validate/user.validate');

// danh sách bài viết
router.get('/login', authorController.login);

router.post('/login', authorController.postLogin);


module.exports = router;