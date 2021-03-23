const express = require('express');


const postController = require('./../controllers/post.controller');
// middleware
const validate = require('../validate/user.validate');

const router = express.Router();

// danh sách bài viết
router.get('/', postController.index);

// đường dẫn tìm kiếm
router.get('/search',  postController.search);

// link tạo bài viết
router.get('/add', postController.addPage);

// đường dẫn chi tiết bài post
router.get('/view/:id', postController.viewPost);

// đẩy bài viết lên server
router.post('/add', validate.addPost, postController.addPost);

module.exports = router;