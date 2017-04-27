var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Customer = undefined;
var datetime = require('node-datetime');
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Customer = sequelize.define('Customer', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            fullname: Sequelize.STRING,
            email: Sequelize.STRING,
            username:Sequelize.STRING,
            password:Sequelize.STRING,
            birthday:Sequelize.DATE,
            gender:Sequelize.INTEGER,
            identitycard:Sequelize.STRING,
            phone:Sequelize.STRING,
            status: Sequelize.INTEGER
            });
        Customer.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(fullname,email,username,password,birthday,
    gender,identitycard,phone,status, callback) {
    Customer.create({
        id: '',
        fullname:fullname,
        email:email,
        username:username,
        password:password,
        birthday:birthday,
        gender:gender,
        identitycard:identitycard,
        phone:phone,
        status:status
    }).then(function(customer) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id,fullname,email,username,password,birthday,
    gender,identitycard,phone,status, callback) {
    Customer.find({where: {id: id}}).then(function(customer) {
        customer.updateAttributes({
            id:id,
            fullname:fullname,
            email:email,
            username:username,
            password:password,
            birthday:birthday,
            gender:gender,
            identitycard:identitycard,
            phone:phone,
            status:status
      }).then(function(customer) {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
exports.read = function(id, callback) {
    Customer.find({ where:{ id: id} }).then(function(customer) {
        if(!customer) {
            callback(null);
        } else {
            callback({
                id: customer.id,
                fullname:customer.fullname,
                email:customer.email,
                username:customer.username,
                password:customer.password,
                birthday:customer.birthday,
                gender:customer.gender,
                identitycard:customer.identitycard,
                phone:customer.phone,
                status:customer.status
            });
        }
    });
}
exports.getAllCustomer = function(callback) { 
    Customer.findAll().then(function(customers) {
        var customerList = []; 
        customers.forEach(function(customer) { 
            customerList.push({
                id: customer.id,
                fullname:customer.fullname,
                email:customer.email,
                username:customer.username,
                password:customer.password,
                birthday:customer.birthday,
                gender:customer.gender,
                identitycard:customer.identitycard,
                phone:customer.phone,
                status:customer.status
            }); 
        });
        
        callback(customerList);
    });
}
module.exports.findByUsername = function(username, callback) {
    Customer.find({where: {username: username}}).then(function(customer) {
        if(!customer) {
            callback(false);
        } else {
            callback(null, {
                id: customer.id,
                fullname:customer.fullname,
                email:customer.email,
                username:customer.username,
                password:customer.password,
                birthday:customer.birthday,
                gender:customer.gender,
                identitycard:customer.identitycard,
                phone:customer.phone,
                status:customer.status
           });
        } 
    });
}
exports.destroy = function(id, callback){
    Customer.find({where:{id: id}}).then(function(customer){
        customer.destroy().then(function(){
            callback();
        }).error(function(err){
            callback(err);
        });
    });
}
