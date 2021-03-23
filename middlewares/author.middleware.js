const db = require('../db.js');

module.exports.requierAuthor = (req, res, next) => {
    if(!req.cookies.userId){
        res.redirect('/author/login');
        return;
    }

    const user = db.get('user').find({id : req.cookies.userId});

    if(!user) {
        res.redirect('/author/login');
        return;
    }

    next();
}