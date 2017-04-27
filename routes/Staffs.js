var LocalStrategy = require('passport-local').Strategy;
var Staffs = undefined;
var passport = undefined;
exports.configure = function(params) {
    Staffs = params.Staffs;
    passport = params.passport;
}
module.exports.serialize = function(staffs, done) {
    done(null, staffs.idstaffs);
}
module.exports.deserialize = function(id, done) {
    Staffs.findById(id, function(err, staffs) {
        done(err, staffs);
    });
}
module.exports.strategy = new LocalStrategy(
    function(username, password, done) {
        process.nextTick(function() {
            Staffs.findByUsername(username, password, function(err, staffs) {
                if(!err){
                    return done(null, staffs);
                }else{
                    return done(null, false);
                }
                
            });
        });
    }
);
module.exports.ensureAuthenticated = function(req, res, next) {
    if(req.isAuthenticated())
        return next();
    return res.redirect('/login');
}
module.exports.doLogin = function(req, res) {
    res.render('admin_login', {
        title: 'Login to Note',
        staffs: req.user,
        message: req.flash('error')
    });
}
 
module.exports.postLogin = function(req, res) {
     res.redirect('/admin');
}
 
module.exports.doLogout = function(req, res) {
     req.logout();
     res.redirect('/admin');
}