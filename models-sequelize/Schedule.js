var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Schedule = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Schedule = sequelize.define('Schedule', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            showday: Sequelize.DATE,
            time: Sequelize.INTEGER,
            idroom: Sequelize.BIGINT,
            idmovie:Sequelize.BIGINT,
            status:Sequelize.INTEGER
            });
        Schedule.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(showday,time,idroom,idmovie,callback) {
    Schedule.create({
        id: '',
        showday:showday,
        time:time,
        idroom:idroom,
        idmovie:idmovie,
        status:"1"
    }).then(function(schdule) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id,duration,time,idroom,idmovie,idticket,status, callback) {
    Schedule.find({where: {id: id}}).then(function(schdule) {
        Schedule.updateAttributes({
            id: id,
            duration:duration,
            time:time,
            idroom:idroom,
            idmovie:idmovie,
            idticket:idticket,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.read = function(id, callback) {
    Schedule.find({ where:{ id: id} }).then(function(schdule) {
        if(!schdule) {
            callback(null);
        } else {
            callback({
                id: schdule.id,
                duration:schdule.duration,
                time:schdule.time,
                idroom:schdule.idroom,
                idmovie:schdule.idmovie,
                idticket:schdule.idticket,
                status:schdule.status
            });
        }
    });
}
exports.getAllSchedule = function(callback) { 
    Schedule.findAll().then(function(schdules) {
        var scheduleList = []; 
        schdules.forEach(function(schdule) { 
            scheduleList.push({
                id: schdule.id,
                showday:schdule.showday,
                time:schdule.time,
                idroom:schdule.idroom,
                idmovie:schdule.idmovie,
                status:schdule.status
                 }); 
        });
        
        callback(scheduleList);
    });
}
exports.destroy = function(id, callback) {
    Schedule.find({ where:{ id: id} }).then(function(schdule) {
        schdule.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
