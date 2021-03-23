const db = require('./../db.js');

module.exports.home = (req, res) => {
	res.render('/', {
		posts: db.get('dataPosts').value()
	})
}