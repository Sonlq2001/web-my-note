const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ dataPosts : [] })
  .write();


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

// danh sách bài viết
app.get('/posts', (req, res) => {
	res.render('./posts/list_post', {
		posts: db.get('dataPosts').value()
	})
})

// đường dẫn tìm kiếm
app.get('/posts/search', (req, res) => {
	const valueSearch = req.query.q;
	const matchedValue = db.get('dataPosts').value().filter((post) => {
		return post.title.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1;
	})

	// render giá trị vừa tìm kiếm
	res.render('./posts/list_post', {
		posts: matchedValue,
		value: valueSearch
	})
})

// link tạo bài viết
app.get('/posts/add', (req, res) => {
	res.render('./posts/add_post');
})

// đường dẫn chi tiết bài post
app.get('/posts/view/:id', (req, res) => {
	const idPost = req.params.id;

	const viewPost =  db.get('dataPosts').value().find(post => {
		return post.id == idPost;
	})

	res.render('./posts/view_post', {
		view: viewPost
	});
})


// đẩy bài viết lên server
app.post('/posts/add', (req, res) => {
	const post = req.body;
	post.id = Math.random().toString(36).substr(2, 9);
	db.get('dataPosts').push(post).write();
	// chuyển hướng trang sau khi đã thêm post
	res.redirect('/posts');

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})