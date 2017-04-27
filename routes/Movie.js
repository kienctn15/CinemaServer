var movie = undefined;
var S = require('string');

exports.configure = function(params) {
    movie = params;
}

exports.View=function(req,res,next){
	movie.getAllMovie(function(movie){
		res.render('admin_movie',{movie:movie, user:req.user});
	})
}
exports.Viewbyid=function(req,res,next){
	movie.readMovie(req.body.setfilm,function(movie){
		res.render('admin_listschedule',{movie:movie});
	})
}
exports.Insert=function(req,res,next){
    var s = req.body.image1;
    if(s !== ''){
        var i = S(s).splitRight('\\', 1);
        var img = i[1];
			if(req.body.docreate =='create')
				{
				movie.createMovie(req.body.namefilm,req.body.description,req.body.imdb,img,req.body.duration,req.body.director,req.body.actornactress,req.body.language,req.body.nation,req.body.startday,req.body.format,req.body.urltrailer,req.body.ages,req.body.category,req.body.content,req.body.status,function(err){
					if(err){
						res.redirect('/quan-ly-phim');
							}
					else{
						res.redirect('/quan-ly-phim');
						}
								});
			}
			else{
				console.log(req.body.id);
				movie.updateMovie(req.body.id,req.body.namefilm,req.body.description,req.body.imdb,img,req.body.duration,req.body.director,req.body.actornactress,req.body.language,req.body.nation,req.body.startday,req.body.format,req.body.urltrailer,req.body.ages,req.body.category,req.body.content,req.body.status, function(){
				res.redirect('/quan-ly-phim');	

				});
			}
}
	else{
			movie.updateMovie(req.body.id,req.body.namefilm,req.body.description,req.body.imdb,null,req.body.duration,req.body.director,req.body.actornactress,req.body.language,req.body.nation,req.body.startday,req.body.format,req.body.urltrailer,req.body.ages,req.body.category,req.body.content,req.body.status, function(){
				res.redirect('/quan-ly-phim');
				});
		}
}
exports.Delete=function(req,res,next){
	movie.destroyMovie(req.query.id, function(result){
		res.redirect('/quan-ly-phim');
	});
}