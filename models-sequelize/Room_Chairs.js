var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Room_Chairs = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Room_Chairs = sequelize.define('Room_Chairs', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            idroom:Sequelize.BIGINT,
            chairname:{
                type:Sequelize.STRING,
            },
            typeofchair:Sequelize.INTEGER,
            status: Sequelize.INTEGER
            });
        Room_Chairs.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(idroom,idchairs,chairname, callback) {
    Room_Chairs.create({
        id: '',
        idroom:idroom,
        idchairs:idchairs,
        chairname:chairname,
        status:"1"
    }).then(function(room_chairs) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id, idroom,idchairs,chairname, callback) {
    Room_Chairs.find({where: {id: id}}).then(function(room_chairs) {
        room_chairs.updateAttributes({
            id: id,
            idroom:idroom,
            idchairs:idchairs,
            chairname:chairname,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.read = function(id, callback) {
    Room_Chairs.find({ where:{ id: id} }).then(function(room_chairs) {
        if(!room_chairs) {
            callback(null);
        } else {
            callback({
                id: room_chairs.id,
                idroom:room_chairs.idroom,
                idchairs:room_chairs.idchairs,
                chairname:room_chairs.chairname,
                status: room_chairs.status
            });
        }
    });
}
exports.getAllRoom_chairs = function(callback) { 
    Room_Chairs.findAll({where:{status: 1}}).then(function(room_chairs) {
        var room_chairsList = []; 
        room_chairs.forEach(function(room_chair) { 
            room_chairsList.push({
                id: room_chair.id,
                idroom:room_chair.idroom,
                idchairs:room_chair.idchairs,
                chairname:room_chair.chairname,
                status: room_chair.status
            }); 
        });
        
        callback(null, room_chairsList);
    });
}
exports.destroy = function(id, callback) {
    Room_Chairs.find({ where:{ id: id} }).then(function(room_chairs) {
        room_chairs.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
