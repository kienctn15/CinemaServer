var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Movie = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Movie = sequelize.define('Movie', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            name: Sequelize.STRING,
            description: Sequelize.STRING,
            image: Sequelize.STRING,
            duration:Sequelize.INTEGER,
            director:Sequelize.STRING,
            actornactress:Sequelize.STRING,
            language:Sequelize.STRING,
            nation:Sequelize.STRING,
            startday:Sequelize.DATE,
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
}
module.exports.create = function(name, description, image, duration, director, actornactress, language, nation, startday, format, urltrailer, ages, category,content,status, callback) {
    var img = './public/Image/film/' + image;
    Movie.create({
        id: '',
        name:name,
        description:description,
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
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id, name,description,image,duration,director,
    actornactress,language,nation,startday,format,urltrailer,ages, category, content, status, callback) {
    if(image !== null){
    var img = './public/Image/film/' + image;
    Movie.find({where: {id: id}}).then(function(movie) {
        movie.updateAttributes({
            id: id,
            name:name,
            description:description,
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
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
else{
    Movie.find({where: {id: id}}).then(function(movie) {
        movie.updateAttributes({
            id: id,
            name:name,
            description:description,
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
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
}
exports.read = function(id, callback) {
    Movie.find({ where:{ id: id} }).then(function(movie) {
        if(!movie) {
            callback(null);
        } else {
            callback({
                id: movie.id,
                name:movie.name,
                description:movie.description,
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

exports.findByID = function(id, callback) {
    Movie.find({ where:{ id: id} }).then(function(movie) {
        callback({name: movie.name});
    })
}
exports.getAllMovie = function(callback) { 
    Movie.findAll().then(function(movies) {
        var movieList = []; 
        movies.forEach(function(movie) { 
            movieList.push({
                id: movie.id,
                name:movie.name,
                description:movie.description,
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

exports.destroy = function(id, callback){
    Movie.find({where:{id: id}}).then(function(movie){
        movie.destroy().then(function(){
            callback();
        }).error(function(err){
            callback(err);
        });
    });
}
