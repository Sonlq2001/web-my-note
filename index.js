const express = require('express');

const postRoute = require('./routes/post.route');
const db = require('./db.js');

const app = express();
const port = 3000;

// cấu hình template engine pug
app.set('view engine', 'pug');
app.set('views', './views');

// cấu hình lấy dữ liệu từ form gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file
app.use(express.static('public'))

// trang chủ
app.get('/', (req, res) => {
  res.render('layouts/home', {
  	posts: db.get('dataPosts').value()
  });
})

app.use('/posts', postRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})