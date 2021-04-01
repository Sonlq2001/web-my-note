const db = require('./../db.js');

module.exports.addCart = (req, res) => {
	const productId = req.params.id;
	const sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/');
		return;
	}

	const count = db.get('sessions')
		.find({ id: sessionId })
		.get('cart.' + productId, 0)
		.value();

	db.get('sessions')
		.find({ id: sessionId })
		.set('cart.' + productId, count + 1)
		.write();

	res.redirect('/');
}