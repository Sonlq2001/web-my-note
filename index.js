const express = require('express');

const postRoute = require('./routes/post.route');

const app = express();
const port = 3000;

// cấu hình template engine pug
app.set('view engine', 'pug');
app.set('views', './views');

// cấu hình lấy dữ liệu từ form gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// trang chủ
app.get('/', (req, res) => {
  res.render('index');
})

app.use('/posts', postRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})