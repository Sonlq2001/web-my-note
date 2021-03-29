const db = require('../db.js');

module.exports.requierAuthor = (req, res, next) => {
    if(!req.signedCookies.userId){
        res.redirect('/author/login');
        return;
    }

    const user = db.get('user').find({id : req.signedCookies.userId}).value();

    if(!user) {
        res.redirect('/author/login');
        return;
    }

   res.locals.user = user;

    next();
}