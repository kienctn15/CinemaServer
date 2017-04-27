var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var TicketInfo = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        TicketInfo = sequelize.define('TicketInfo', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            idmmovie: Sequelize.BIGINT,
            date: Sequelize.DATE,
            timeframe:Sequelize.STRING,
            typeofseat:Sequelize.INTEGER,
            seatnumber:Sequelize.INTEGER,
            idroom:Sequelize.BIGINT,
            idcustomer:Sequelize.BIGINT,
            idschedule:Sequelize.BIGINT,
            status: Sequelize.INTEGER
            });
        TicketInfo.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(idmmovie,date,timeframe,typeofseat,idroom,idcustomer,idschedule, callback) {
    TicketInfo.create({
        id: '',
        idmmovie:idmmovie,
        date:date,
        timeframe:timeframe,
        typeofseat:typeofseat,
        idroom:idroom,
        idcustomer:idcustomer,
        idschedule:idschedule,
        status:"1"
    }).then(function(room) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id,idmmovie,date,timeframe,typeofseat,idroom,idcustomer,idschedule,status, callback) {
    TicketInfo.find({where: {id: id}}).then(function(ticketinfo) {
        TicketInfo.updateAttributes({
            id: id,
            idmmovie:idmmovie,
            date:date,
            timeframe:timeframe,
            typeofseat:typeofseat,
            idroom:idroom,
            idcustomer:idcustomer,
            idschedule:idschedule,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.read = function(id, callback) {
    TicketInfo.find({ where:{ id: id} }).then(function(ticketinfo) {
        if(!ticketinfo) {
            callback(null);
        } else {
            callback({
            id:ticketinfo.id,
            idmmovie:ticketinfo.idmmovie,
            date:ticketinfo.date,
            timeframe:ticketinfo.timeframe,
            typeofseat:ticketinfo.typeofseat,
            idroom:ticketinfo.idroom,
            idcustomer:ticketinfo.idcustomer,
            idschedule:ticketinfo.idschedule,
            status:ticketinfo.status
            });
        }
    });
}
exports.getAllTicketInfo = function(callback) { 
    TicketInfo.findAll({where:{status: 1}}).then(function(ticketinfos) {
        var ticketinfoList = []; 
        ticketinfos.forEach(function(ticketinfo) { 
            ticketinfoList.push({
            id:ticketinfo.id,
            idmmovie:ticketinfo.idmmovie,
            date:ticketinfo.date,
            timeframe:ticketinfo.timeframe,
            typeofseat:ticketinfo.typeofseat,
            idroom:ticketinfo.idroom,
            idcustomer:ticketinfo.idcustomer,
            idschedule:ticketinfo.idschedule,
            status:ticketinfo.status 
            }); 
        });
        
        callback(null, ticketinfoList);
    });
}
exports.destroy = function(id, callback) {
    TicketInfo.find({ where:{ id: id} }).then(function(ticketinfo) {
        ticketinfo.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
