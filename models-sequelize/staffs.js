var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Staffs = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Staffs = sequelize.define('Staffs', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.STRING,
                unique: true
            },
            password: Sequelize.STRING,
            fullname: Sequelize.STRING,
            status: Sequelize.INTEGER
            });
        Staffs.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.findById = function(id, callback) {
    Staffs.find({ where: { id: id} }).then(function(user) {
        if(!user) {
            callback('User ' + id + ' does not exist');
        } else {
            callback(null, {
                id: user.id,
                username: user.username,
                password: user.password,
                fullname: user.fullname,
                status:user.status
            });
        }
    });
}
module.exports.findByUsername = function(username, callback) {
    Staffs.find({where: {username: username}}).then(function(user) {
        if(!user) {
            callback(false);
        } else {
            callback(null, {
                id: user.id,
                username: user.username,
                password: user.password,
                fullname: user.fullname,
                status:user.status
           });
        } 
    });
}
module.exports.create = function(username, password, fullname, callback) {
    Staffs.create({
        id: '',
        username: username,
        password: password,
        fullname: fullname,
        status:"1"
    }).then(function(user) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id, username, password, fullname, status,  callback) {
    Staffs.find({where: {id: id}}).then(function(user) {
        user.updateAttributes({
            id: id,
            username: username,
            password: password,
            fullname: fullname,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.destroy = function(id, callback) {
    Staffs.find({ where:{ id: id} }).then(function(staff) {
        staff.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
