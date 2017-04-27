var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var TicketPrice = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        TicketPrice = sequelize.define('TicketPrice', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            typeofmovie: Sequelize.INTEGER,
            typeoftimeframe:Sequelize.INTEGER,
            typeofday:Sequelize.INTEGER,
            typeofchair:Sequelize.INTEGER,
            price:Sequelize.INTEGER,
            status: Sequelize.INTEGER
            });
        TicketPrice.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(typeofmovie,typeoftimeframe,typeofday,typeofchair,price, callback) {
    TicketPrice.create({
        id: '',
        typeofmovie:typeofmovie,
        typeoftimeframe:typeoftimeframe,
        typeofday:typeofday,
        typeofchair:typeofchair,
        price:price,
        status:"1"
    }).then(function(room) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id,price,status, callback) {
    TicketPrice.find({where: {id: id}}).then(function(ticketprice) {
        ticketprice.updateAttributes({
            price:price,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.read = function(id, callback) {
    TicketPrice.find({ where:{ id: id} }).then(function(ticketprice) {
        if(!ticketprice) {
            callback(null);
        } else {
            callback({
                id: ticketprice.id,
                typeofmovie:ticketprice.typeofmovie,
                typeoftimeframe:ticketprice.typeoftimeframe,
                typeofday:ticketprice.typeofday,
                typeofchair:ticketprice.typeofchair,
                price:ticketprice.price,
                status:ticketprice.status
            });
        }
    });
}
exports.getAllTicketPrice = function(callback) { 
    TicketPrice.findAll().then(function(ticketprices) {
        var ticketpriceList = []; 
        ticketprices.forEach(function(ticketprice) { 
            ticketpriceList.push({
                id: ticketprice.id,
                typeofmovie:ticketprice.typeofmovie,
                typeoftimeframe:ticketprice.typeoftimeframe,
                typeofday:ticketprice.typeofday,
                typeofchair:ticketprice.typeofchair,
                price:ticketprice.price,
                status:ticketprice.status
            }); 
        });
        
        callback(ticketpriceList);
    });
}
exports.destroy = function(id, callback) {
    TicketPrice.find({ where:{ id: id} }).then(function(ticketprice) {
        ticketprices.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
