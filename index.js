const express = require('express');
const cookieParser = require('cookie-parser');


const db = require('./db.js');
const postRoute = require('./routes/post.route');
const authorRoute = require('./routes/author.route');

const authorMiddleware = require('./middlewares/author.middleware');

const app = express();
const port = 3000;

// cấu hình template engine pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser());

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


app.use('/posts', authorMiddleware.requierAuthor, postRoute);
app.use('/author', authorRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})