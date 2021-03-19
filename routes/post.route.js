const express = require('express');
const router = express.Router()

const postController = require('./../controllers/post.controller');

// danh sách bài viết
router.get('/', postController.index);

// đường dẫn tìm kiếm
router.get('/search', postController.search);

// link tạo bài viết
router.get('/add', postController.addPage);

// đường dẫn chi tiết bài post
router.get('/view/:id', postController.viewPost);

// đẩy bài viết lên server
router.post('/add', postController.addPost);

module.exports = router;