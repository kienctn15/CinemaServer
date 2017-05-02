var events = require('events');
var emitter = module.exports.emitter = new events.EventEmitter();
var util = require('util');

var Sequelize = require('sequelize');
var sequelize = undefined;
var Customer = undefined;
var Movie=undefined;
var Room=undefined;
var Room_Chairs=undefined;
var Schedule=undefined;
var Staffs=undefined;
var TicketInfo=undefined;
var TicketPrice=undefined;

module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);

    // Customer model ............................................
        Customer = sequelize.define('Customer', {
            idcustomer: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                referencesKey: 'idcustomer'
            },
            fullname: Sequelize.STRING,
            email: Sequelize.STRING,
            username:Sequelize.STRING,
            password:Sequelize.STRING,
            birthday:Sequelize.STRING,
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
   // Movie model ............................................
   Movie = sequelize.define('Movie', {
            idmovie: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                referencesKey: 'idmovie'
            },
            name: Sequelize.STRING,
            description: Sequelize.STRING,
            imdb:Sequelize.FLOAT,
            image: Sequelize.STRING,
            duration:Sequelize.INTEGER,
            director:Sequelize.STRING,
            actornactress:Sequelize.STRING,
            language:Sequelize.STRING,
            nation:Sequelize.STRING,
            startday:Sequelize.STRING,
            format:Sequelize.INTEGER,
            urltrailer:Sequelize.STRING,
            ages:Sequelize.INTEGER,
            category:Sequelize.STRING,
            content:Sequelize.TEXT,
            status: Sequelize.INTEGER
            });
    Movie.sync().then(function() {
        	callback()
    	}).error(function(err) {
        		callback(err);
    	});
    // Room model ............................................
    Room = sequelize.define('Room', {
            idroom: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                referencesKey: 'idroom'
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
    // Room_Chairs model ............................................
    Room_Chairs = sequelize.define('Room_Chairs', {
            idroomchairs: {
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
     // TicketPrice model ............................................
    TicketPrice = sequelize.define('TicketPrice', {
            idticketprice: {
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
    // Schedule model ............................................
    Schedule = sequelize.define('Schedule', {
            idschedule: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                referencesKey: 'idschedule'
            },
            showday: Sequelize.STRING,
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
    // Staffs model ............................................
    Staffs = sequelize.define('Staffs', {
            idstaffs: {
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
    
    // TicketInfo model ............................................
    TicketInfo = sequelize.define('TicketInfo', {
            idticketinfo: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            date: Sequelize.STRING,
            timeframe:Sequelize.INTEGER,
            typeofseat:Sequelize.STRING,
            namechair:Sequelize.STRING,
            idroom:Sequelize.BIGINT,
            idcustomer:Sequelize.BIGINT,
            idmovie:Sequelize.BIGINT,
            price:Sequelize.INTEGER,
            status: Sequelize.INTEGER
            });
        TicketInfo.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
   

    //Key................................1---n....................
    Schedule.belongsTo(Movie,{foreignKey:'idmovie'});
    Movie.hasMany(Schedule,{foreignKey:'idmovie'});

    Schedule.belongsTo(Room,{foreignKey:'idroom'});
    Room.hasMany(Schedule,{foreignKey:'idroom'});

    TicketInfo.belongsTo(Movie,{foreignKey:'idmovie'});
    Movie.hasMany(TicketInfo,{foreignKey:'idmovie'});

    TicketInfo.belongsTo(Customer,{foreignKey:'idcustomer'});
    Customer.hasMany(TicketInfo,{foreignKey:'idcustomer'});

    TicketInfo.belongsTo(Room,{foreignKey:'idroom'});
    Room.hasMany(TicketInfo,{foreignKey:'idroom'});



}
exports.disconnect = function(callback) {
    callback();
}

// Function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Customer function............................................
exports.getAllCustomer = function(callback) { 
    Customer.findAll().then(function(customers) {
        var customerList = []; 
        customers.forEach(function(customer) { 
            customerList.push({
                idcustomer: customer.idcustomer,
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
module.exports.createCustomer = function(fullname,email,username,password,birthday,
    gender,identitycard,phone,status, callback) {
    Customer.create({
        idcustomer: '',
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
module.exports.updateCustomer = function(idcustomer,fullname,email,username,password,birthday,
    gender,identitycard,phone,status, callback) {
    Customer.find({where: {idcustomer: idcustomer}}).then(function(customer) {
        customer.updateAttributes({
            idcustomer:idcustomer,
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
exports.destroyCustomer = function(idcustomer, callback){
    Customer.find({where:{idcustomer: idcustomer}}).then(function(customer){
        customer.destroy().then(function(){
            callback();
        }).error(function(err){
            callback(err);
        });
    });
}
// Movie function............................................
exports.getAllMovie = function(callback) { 
    Movie.findAll().then(function(movies) {
        var movieList = []; 
        movies.forEach(function(movie) { 
            movieList.push({
                idmovie: movie.idmovie,
                name:movie.name,
                description:movie.description,
                imdb:movie.imdb,
                image:movie.image,
                duration:movie.duration,
                director:movie.director,
                actornactress:movie.actornactress,
                language:movie.language,
                nation:movie.nation,
                startday:movie.startday,
                format:movie.format,
                urltrailer:movie.urltrailer,
                ages:movie.ages,
                category:movie.category,
                content:movie.content,
                status:movie.status
            }); 
        });
        
        callback(movieList);
    });
}
exports.getAllMovieStatus = function(callback) { 
    Movie.findAll({where:{status:{$ne:0}}}).then(function(movies) {
        var movieList = []; 
        movies.forEach(function(movie) { 
            movieList.push({
                idmovie: movie.idmovie,
                name:movie.name,
                description:movie.description,
                imdb:movie.imdb,
                image:movie.image,
                duration:movie.duration,
                director:movie.director,
                actornactress:movie.actornactress,
                language:movie.language,
                nation:movie.nation,
                startday:movie.startday,
                format:movie.format,
                urltrailer:movie.urltrailer,
                ages:movie.ages,
                category:movie.category,
                content:movie.content,
                status:movie.status
            }); 
        });
        
        callback(movieList);
    });
}
module.exports.createMovie = function(name, description,imdb, image, duration, director, actornactress, language, nation, startday, format, urltrailer, ages, category,content,status, callback) {
    var img = 'public/Image/film/' + image;
    Movie.create({
        idmovie: '',
        name:name,
        description:description,
        imdb:imdb,
        image:img,
        duration:duration,
        director:director,
        actornactress:actornactress,
        language:language,
        nation:nation,
        startday:startday,
        format:format,
        urltrailer:urltrailer,
        ages:ages,
        category:category,
        content:content,
        status:status
    }).then(function(movie) {
        exports.emitter.emit('createmovie');  
        callback();
    }).error(function(err) {
        exports.emitter.emit('createmoviefail'); 
        callback(err);
    });
}
module.exports.updateMovie = function(idmovie, name,description,imdb,image,duration,director,
    actornactress,language,nation,startday,format,urltrailer,ages, category, content, status, callback) {
    if(image !== null){
    var img = 'public/Image/film/' + image;
    Movie.find({where: {idmovie: idmovie}}).then(function(movie) {
        movie.updateAttributes({
            idmovie: idmovie,
            name:name,
            description:description,
            imdb:imdb,
            image:img,
            duration:duration,
            director:director,
            actornactress:actornactress,
            language:language,
            nation:nation,
            startday:startday,
            format:format,
            urltrailer:urltrailer,
            ages:ages,
            category:category,
            content:content,
            status:status
        }).then(function(movie) {
            exports.emitter.emit('updatemovie');  
            callback();

        }).error(function(err) {
            exports.emitter.emit('updatemoviefail'); 
            callback(err);
        });
    });
}
else{
    Movie.find({where: {idmovie: idmovie}}).then(function(movie) {
        movie.updateAttributes({
            idmovie: idmovie,
            name:name,
            description:"",
            imdb:imdb,
            duration:duration,
            director:director,
            actornactress:actornactress,
            language:language,
            nation:nation,
            startday:startday,
            format:format,
            urltrailer:urltrailer,
            ages:ages,
            category:category,
            content:content,
            status:status
        }).then(function(movie) {
            exports.emitter.emit('updatemovie'); 
            callback();
        }).error(function(err) {
            exports.emitter.emit('updatemoviefail'); 
            callback(err);
        });
    });
}
}
exports.readMovie = function(idmovie, callback) {
    Movie.find({ where:{ idmovie: idmovie} }).then(function(movie) {
        if(!movie) {
            callback(null);
        } else {
            callback({
                idmovie: movie.idmovie,
                name:movie.name,
                description:movie.description,
                imdb:movie.imdb,
                image:movie.image,
                duration:movie.duration,
                director:movie.director,
                actornactress:movie.actornactress,
                language:movie.language,
                nation:movie.nation,
                startday:movie.startday,
                format:movie.format,
                urltrailer:movie.urltrailer,
                ages:movie.ages,
                category:movie.category,
                content:movie.content,
                status:movie.status
            });
        }
    });
}
exports.destroyMovie = function(idmovie, callback){
    Movie.find({where:{idmovie: idmovie}}).then(function(movie){
        movie.destroy().then(function(){
            callback();
        }).error(function(err){
            callback(err);
        });
    });
}
// TicketPrice function............................................
exports.getAllTicketPrice = function(callback) { 
    TicketPrice.findAll().then(function(ticketprices) {
        var ticketpriceList = []; 
        ticketprices.forEach(function(ticketprice) { 
            ticketpriceList.push({
                idticketprice: ticketprice.idticketprice,
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
module.exports.updateTicketprice = function(idticketprice,price,status, callback) {
    TicketPrice.find({where: {idticketprice: idticketprice}}).then(function(ticketprice) {
        ticketprice.updateAttributes({
            price:price,
            status:status
        }).then(function() {
            exports.emitter.emit('updateticketprice'); 
            callback();
        }).error(function(err) {
            exports.emitter.emit('updateticketpricefail'); 
            callback(err);
        });
    });
}
// Schedule function............................................
exports.getAllSchedule = function(callback) { 
    var datetime = new Date();
    var a=datetime.getDate();
    var b=datetime.getMonth()+1;
    if(b<10){
        bb='0'+b;
    }
    else
    {
       bb=b;
    }
    var c=datetime.getFullYear();
    var full=c+'-'+bb+'-'+a;
    Schedule.findAll({where:{showday:{$gte:full}},
         include: [{
            model: Movie
        }]
    }).then(function(schdules) {
        var scheduleList = []; 
        schdules.forEach(function(schdule) { 
            scheduleList.push({
                idschedule: schdule.idschedule,
                showday:schdule.showday,
                time:schdule.time,
                idroom:schdule.idroom,
                idmovie:schdule.idmovie,
                namemovie: schdule.Movie.name,
                status:schdule.status
                 }); 
        });
        
        callback(scheduleList);
    });
}
exports.getDaySchedule=function(showday, callback){
    Schedule.findAll({ where:{ showday: showday}, include:[{
        model:Movie
    }]}).then(function (dayschedule){ 
        callback(dayschedule);
    });
}
exports.getOneSchedule=function(showday,time,idroom,callback){
    Schedule.find({ where:{ showday: showday,time:time,idroom:idroom}}).then(function (oneschedule){ 
        if(!oneschedule){
            callback(false);
        }
        else{
            exports.emitter.emit('schedulefail');
            callback(true);
        }
    });
}
module.exports.createSchedule = function(showday,time,idroom,idmovie,callback) {
    Schedule.create({
        idschedule: '',
        showday:showday,
        time:time,
        idroom:idroom,
        idmovie:idmovie,
        status:"1"
    }).then(function(schdule) {
        exports.emitter.emit('createschedule');
        callback();
    }).error(function(err) {
        exports.emitter.emit('createschedulefail');
        callback(err);
    });
}
module.exports.updateSchedule = function(idschedule,showday,time,idroom,status, callback) {
    console.log(showday);
        Schedule.find({where: {idschedule: idschedule}}).then(function(schdule) {
        schdule.updateAttributes({
            idschedule:idschedule,
            showday:showday,
            time:time,
            idroom:idroom,
            status:status
        }).then(function() {
            exports.emitter.emit('updateschedule');
            callback();
        }).error(function(err) {
            exports.emitter.emit('updateschedulefail');
            callback(err);
        });
    });  
}
exports.destroySchedule = function(idschedule, callback) {
    Schedule.find({ where:{ idschedule: idschedule} }).then(function(schdule) {
        schdule.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
// Ticketinfo function............................................

module.exports.createTicketInfo = function(date,timeframe,typeofseat,namechair,idroom,idcustomer,idmovie,price, callback) {
    TicketInfo.create({
        idticketinfo: '',
        date:date,
        timeframe:timeframe,
        typeofseat:typeofseat,
        namechair:namechair,
        idroom:idroom,
        idcustomer:idcustomer,
        idmovie:idmovie,
        price:price,
        status:"1"
    }).then(function() {
        exports.emitter.emit('createticketinfo');
        callback();
    }).error(function(err) {
        exports.emitter.emit('createticketinfo');
        callback(err);
    });
}

module.exports.getTicketInfo=function(callback){
    var ticketinfoList = []; 
    TicketInfo.findAll({where:{status:'1'},
        include: [{model: Customer},{model:Movie},{model:Room}]
        }).then(function(ticketinfo){      
        ticketinfo.forEach(function(ticketinfos){
            ticketinfoList.push({
                idticketinfo:ticketinfos.idticketinfo,
                date:ticketinfos.date,
                timeframe:ticketinfos.timeframe,
                typeofseat:ticketinfos.typeofseat,
                namechair:ticketinfos.namechair,
                idroom:ticketinfos.idroom,
                roomname:ticketinfos.Room.roomname,
                idcustomer:ticketinfos.idcustomer,
                nameCustomer:ticketinfos.Customer.fullname,
                idmovie:ticketinfos.idmovie,
                namemovie:ticketinfos.Movie.name,
                price:ticketinfos.price,
                status:ticketinfos.status
            }); 
        });
        callback(ticketinfoList);
    });

}
module.exports.getPriceMovie=function(idmovie,callback){
    var ticketinfoList = []; 
    TicketInfo.findAll({where:{idmovie:idmovie,status:'0'}, 
        include: [{model:Movie}]
        }).then(function(ticketinfo){      
        ticketinfo.forEach(function(ticketinfos){
            ticketinfoList.push({
                idticketinfo:ticketinfos.idticketinfo,
                date:ticketinfos.date,
                timeframe:ticketinfos.timeframe,
                typeofseat:ticketinfos.typeofseat,
                namechair:ticketinfos.namechair,
                idroom:ticketinfos.idroom,
                idcustomer:ticketinfos.idcustomer,
                idmovie:ticketinfos.idmovie,
                namemovie:ticketinfos.Movie.name,
                price:ticketinfos.price,
                status:ticketinfos.status
            }); 
        });
        callback(ticketinfoList);
    });

}
module.exports.UpdateStatus = function(idticketinfo, callback) {
    TicketInfo.find({where: {idticketinfo: idticketinfo}}).then(function(updatestatus) {
        updatestatus.updateAttributes({
            status:'0'
        }).then(function() {
            exports.emitter.emit('updatestatus');
            callback();
        }).error(function(err) {
            exports.emitter.emit('updatestatusfail');
            callback(err);
        });
    });
}
module.exports.getNameChair= function(date,timeframe,idmovie,idroom,callback){
    TicketInfo.findAll({ where:{ date:date,timeframe:timeframe,idmovie:idmovie,idroom:idroom }}).then(function(ticketinfo) {
        var ticketinfoList = []; 
        ticketinfo.forEach(function(ticketinfos) { 
            ticketinfoList.push({
                idticketinfo:ticketinfos.idticketinfo,
                namechair:ticketinfos.namechair
            }); 
        });
        callback(ticketinfoList);
});
}
// Ticketprice function............................................
module.exports.getOneTicketPrice= function(typeofmovie,typeoftimeframe,typeofday,typeofchair,callback){
    TicketPrice.find({ where:{ typeofmovie: typeofmovie,typeoftimeframe:typeoftimeframe,typeofday:typeofday,typeofchair:typeofchair } }).then(function(ticketprice) {
        callback({price:ticketprice.price});
    }).error(function(err) {
        callback(err);
    });
}
// Staff function............................................
module.exports.findByUsername = function(username, password, callback) {
    Staffs.find({where: {username: username, password:password}}).then(function(user) {
        if(!user) {
            callback(false, null);
        } else {

            callback(null, {
                idstaffs: user.idstaffs,
                username: user.username,
                password: user.password,
                email: user.email,
                fullname: user.fullname,
                status: user.status
           });
        } 
    });
}
module.exports.findById = function(idstaffs, callback) {
    Staffs.find({ where: { idstaffs: idstaffs} }).then(function(user) {
        if(!user) {
            callback(false, null);
        } else {
            callback(null, {
                idstaffs: user.idstaffs,
                username: user.username,
                password: user.password,
                email: user.email,
                fullname: user.fullname,
                status: user.status
            });
        }
    });
}
//Lay ghe da dat android
module.exports.getOccupiedSeat= function(date, room, id_time, callback){
    TicketInfo.findAll({ where:{ date: date, timeframe: id_time, idroom: room}}).then(function(ticketinfo) {
        var ticketinfoList = []; 
        ticketinfo.forEach(function(ticketinfos) { 
            ticketinfoList.push({
                idticketinfo:ticketinfos.idticketinfo,
                namechair:ticketinfos.namechair
            }); 
        });
        callback(ticketinfoList);
});
}
///Mobile Function
exports.getAllMovie1 = function(callback) { 
    Movie.findAll({where:{ $or: [{status: '1'}, {status: '2'}] }}).then(function(movies) {
        var movieList = []; 
        movies.forEach(function(movie) { 
            movieList.push({
                id: movie.idmovie,
                name:movie.name, 
                description:movie.description,
                imdb:movie.imdb,
                image:movie.image,
                duration:movie.duration,
                director:movie.director,
                actornactress:movie.actornactress,
                language:movie.language,
                nation:movie.nation,
                startday:movie.startday,
                format:movie.format,
                urltrailer:movie.urltrailer,
                ages:movie.ages,
                category:movie.category,
                content:movie.content,
                status:movie.status
            }); 
        });
        
        callback(movieList);
    });
}

exports.getFeatureMovie = function(callback) { 
    Movie.findAll({where:{ imdb: {$gt:7.1}}}).then(function(movies) {
        var movieList = []; 
        movies.forEach(function(movie) { 
            movieList.push({
                id: movie.idmovie,
                name:movie.name,
                description:movie.description,
                imdb:movie.imdb,
                image:movie.image,
                duration:movie.duration,
                director:movie.director,
                actornactress:movie.actornactress,
                language:movie.language,
                nation:movie.nation,
                startday:movie.startday,
                format:movie.format,
                urltrailer:movie.urltrailer,
                ages:movie.ages,
                category:movie.category,
                content:movie.content,
                status:movie.status
            }); 
        });
        
        callback(movieList);
    });
}

exports.getComingMovie = function(callback) { 
    Movie.findAll({where:{ status: '2'}}).then(function(movies) {
        var movieList = []; 
        movies.forEach(function(movie) { 
            movieList.push({
                id: movie.idmovie,
                name:movie.name,
                description:movie.description,
                imdb:movie.imdb,
                image:movie.image,
                duration:movie.duration,
                director:movie.director,
                actornactress:movie.actornactress,
                language:movie.language,
                nation:movie.nation,
                startday:movie.startday,
                format:movie.format,
                urltrailer:movie.urltrailer,
                ages:movie.ages,
                category:movie.category,
                content:movie.content,
                status:movie.status
            }); 
        });
        
        callback(movieList);
    });
}

exports.getShowingMovie = function(callback) { 
    Movie.findAll({where:{ status: '1'}}).then(function(movies) {
        var movieList = []; 
        movies.forEach(function(movie) { 
            movieList.push({
                id: movie.idmovie,
                name:movie.name,
                description:movie.description,
                imdb:movie.imdb,
                image:movie.image,
                duration:movie.duration,
                director:movie.director,
                actornactress:movie.actornactress,
                language:movie.language,
                nation:movie.nation,
                startday:movie.startday,
                format:movie.format,
                urltrailer:movie.urltrailer,
                ages:movie.ages,
                category:movie.category,
                content:movie.content,
                status:movie.status
            }); 
        });
        
        callback(movieList);
    });
}
exports.getAllSchedule1 = function(callback) { 
    Schedule.findAll({
         include: [{
            model: Movie
        }]
    }).then(function(schdules) {
        var scheduleList = []; 
        schdules.forEach(function(schdule) { 
            scheduleList.push({
                idschedule: schdule.idschedule,
                showday:schdule.showday,
                time:schdule.time,
                idroom:schdule.idroom,
                idmovie:schdule.idmovie,
                namemovie: schdule.Movie.name,
                status:schdule.status
                 }); 
        });
        
        callback(scheduleList);
    });
}
exports.getAllScheduleByIdMovie = function(idmovie, callback) { 
    Schedule.findAll({where:{idmovie: idmovie}}).then(function(schdules) {
        var scheduleList = []; 
        schdules.forEach(function(schdule) { 
            scheduleList.push({
                idschedule: schdule.idschedule,
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
module.exports.getOneTicketInfo= function(idmovie,timeframe,date,callback){
   TicketInfo.find({ where:{ idmovie: idmovie,timeframe:timeframe,date:date } }).then(function(ticketinfo) {
        callback(ticketinfo);
    }).error(function(err) {
        callback(err);
    });
}

//Sign up
module.exports.findByEmailSignup = function(email, callback) {
    Customer.find({where: {email: email}}).then(function(email) {
        if(!email) {
            callback(false);
        } else {
            callback(true);
        } 
    });
}

module.exports.sendMail=function(email,callback){
    var nodemailer=require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    var today = new Date();
    var today1 = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var ss = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = dd +''+ yyyy;
    today1 = mm + ss;
    var transporter = nodemailer.createTransport('smtp://tranthihanh273%40gmail.com:tranthihanh273@smtp.gmail.com');

    var code = today + today1;
    // setup email data with unicode symbols
    var mailOptions = {
        from: '"2NF Cinema" <phamhai1993123123@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Confirm code for remake password', // plain text body
        html: '<b>Confirm code for remake password : ' + code + '</b>'// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            callback(false);
            exports.emitter.emit('appjs_call_server_send_code',email,code,'false');
        }else{
        console.log('Message %s sent: %s', info.messageId, info.response);
        callback(true);
        exports.emitter.emit('appjs_call_server_send_code',email,code,'true');
    }
    });

}

module.exports.findByUsernameSignUp1 = function(username, callback) {
    Customer.find({where: {username: username}}).then(function(user) {
        if(!user) {
            callback(true);
        } else {
            callback(false);
        } 
    });
}


module.exports.customer_signup_android = function(user,pass,email,phone,fullname,passport,address, callback) {
    Customer.create({
        id: '',
        username: user,
        password: pass,
        fullname: fullname,
        address: address,
        phone: phone,
        email: email,
        identitycard:passport,
        status: '1'
    }).then(function(user) {
        callback(true);
    }).error(function(err) {
        callback(false);
    });
}
module.exports.updateUserPassword = function(email, password, callback) {
    Customer.find({where: {email: email}}).then(function(customer) {
        customer.updateAttributes({
            password:password,
      }).then(function(customer) {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
module.exports.CheckLogin = function(username, password, callback) {
    Customer.find({where: {username: username, password:password, status:1}}).then(function(customer) {
        if(!customer) {
            callback(false, null);
        } else {
            callback(true, {
                idcustomer: customer.idcustomer,
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