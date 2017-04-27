var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Chairs = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Chairs = sequelize.define('Chairs', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            typeofchair: Sequelize.INTEGER,
            status: Sequelize.INTEGER
            });
        Chairs.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(typeofchair, callback) {
    Chairs.create({
        id: '',
        typeofchair: typeofchair,
        status:"1"
    }).then(function(chair) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id, typeofchair,status, callback) {
    Chairs.find({where: {id: id}}).then(function(chairs) {
        chairs.updateAttributes({
            id: id,
            typeofchair: typeofchair,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.read = function(id, callback) {
    Chairs.find({ where:{ id: id} }).then(function(chairs) {
        if(!chairs) {
            callback(null);
        } else {
            callback({
                id: chairs.id,
                typeofchair:chairs.typeofchair,
                status: chairs.status
            });
        }
    });
}
exports.getAllChairs = function(callback) { 
    Chairs.findAll({where:{status: 1}}).then(function(chairs) {
        var chairsList = []; 
        chairs.forEach(function(chair) { 
            chairsList.push({
                id: chair.id,
                typeofchair: chair.typeofchair,
                status: chair.status
            }); 
        });
        
        callback(null, chairsList);
    });
}
exports.destroy = function(id, callback) {
    Chairs.find({ where:{ id: id} }).then(function(chairs) {
        chairs.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
