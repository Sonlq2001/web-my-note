const db = require('./../db');

module.exports = (req, res, next) => {
	
	if(!req.signedCookies.sessionId) {

		sessionId = Math.random().toString(36).substr(2, 9);
		res.cookie('sessionId', sessionId, {
			signed: true
		})

		db.get('sessions').push({
			id: sessionId
		}).write();
	}

	next();
}