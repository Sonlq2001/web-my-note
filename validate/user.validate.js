
module.exports.addPost = (req, res, next) => {
    let errors = [];

	// validate
	if(!req.body.title) {
		errors.push('Bạn chưa nhập tiêu đề !');
	}

	if(!req.body.content) {
		errors.push('Bạn chưa nhập nội dung !');
	}

	if(errors.length) {
		res.render('./posts/add_post', {
			errors: errors,
			values: req.body
		});
		return;
	}

    next();
}