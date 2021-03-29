const md5 = require('md5');

const db = require('./../db');

module.exports.login = (req, res) => {
    res.render('author/login')
} 

module.exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = db.get('user').find({email : email}).value();

    if(!user) {
        res.render('author/login', {
            errors: [
                'Tài khoản không tồn tại !'
            ],
            values: req.body
        })
        return;
    }
    
    const hashedPassword = md5(password);

    if(user.password !== hashedPassword) {
        res.render('author/login', {
            errors: [
                'Mật khẩu không chính xác !'
            ],
            values: req.body
        })
        return;
    }

    res.cookie('userId', user.id, {
        signed: true
    })
    res.redirect('/posts');
}