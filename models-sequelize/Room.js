var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Room = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Room = sequelize.define('Room', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            typeofroom:Sequelize.INTEGER,
            roomname: Sequelize.STRING,
            numberofchairs: Sequelize.INTEGER,
            status: Sequelize.INTEGER
            });
        Room.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(roomname,numberofchairs, callback) {
    Room.create({
        id: '',
        roomname:roomname,
        numberofchairs:numberofchairs,
        status:"1"
    }).then(function(room) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id, roomname,numberofchairs,status, callback) {
    Room.find({where: {id: id}}).then(function(room) {
        Room.updateAttributes({
            id: id,
            roomname:roomname,
            numberofchairs:numberofchairs,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.read = function(id, callback) {
    Room.find({ where:{ id: id} }).then(function(room) {
        if(!room) {
            callback(null);
        } else {
            callback({
                id: room.id,
                roomname:room.roomname,
                numberofchairs:room.numberofchairs,
                status: room.status
            });
        }
    });
}
exports.getAllRoom = function(callback) { 
    Room.findAll({where:{status: 1}}).then(function(rooms) {
        var roomList = []; 
        rooms.forEach(function(room) { 
            roomList.push({
                id: room.id,
                roomname:room.roomname,
                numberofchairs:room.numberofchairs,
                status: room.status
            }); 
        });
        
        callback(null, roomList);
    });
}
exports.destroy = function(id, callback) {
    Room.find({ where:{ id: id} }).then(function(room) {
        room.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
