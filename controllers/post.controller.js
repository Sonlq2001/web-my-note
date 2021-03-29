const db = require('./../db.js');


module.exports.index = (req, res) => {
	res.render('./posts/list_post', {
		posts: db.get('dataPosts').value()
	})
}

module.exports.search = (req, res) => {
	const valueSearch = req.query.q;
	const matchedValue = db.get('dataPosts').value().filter((post) => {
		return post.title.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1;
	})

	// render giá trị vừa tìm kiếm
	res.render('./posts/list_post', {
		posts: matchedValue,
		value: valueSearch
	})
}

module.exports.addPage = (req, res) => {
	res.render('./posts/add_post');
}

module.exports.viewPost = (req, res) => {
	const idPost = req.params.id;

	const viewPost =  db.get('dataPosts').value().find(post => {
		return post.id == idPost;
	})

	res.render('./posts/view_post', {
		view: viewPost,
	});
}

module.exports.addPost = (req, res) => {
	const post = req.body;
	
	post.id = Math.random().toString(36).substr(2, 9);
	db.get('dataPosts').push(post).write();
	// chuyển hướng trang sau khi đã thêm post
	res.redirect('/posts');

}