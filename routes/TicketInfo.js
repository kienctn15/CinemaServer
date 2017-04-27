var model = undefined;
exports.configure = function(params) {
    model = params;
}
exports.View=function(req,res,next){
		model.getTicketInfo(function(getticketinfo){
			res.render('admin_print',{getticketinfo:getticketinfo,user:req.user});
		})
		
}
exports.UpdatePrint=function(req,res,next){
	model.UpdateStatus(req.query.id, function(result){
		res.redirect('/quan-ly-in-ve');
	});
}
exports.ViewPriceMovie=function(req,res,next){
	console.log(req.body.idmovie+"----------------------------------------------------------------------");
	model.getPriceMovie(req.body.idmovie,function(getpricemovie){
		model.getAllMovieStatus(function(movie){
			res.render('admin_report',{movie:movie,user:req.user,getpricemovie:getpricemovie});
		});
	});	
}
exports.ViewMovie=function(req,res,next){
	model.getPriceMovie("",function(getpricemovie){
		model.getAllMovieStatus(function(movie){
			res.render('admin_report',{movie:movie,user:req.user,getpricemovie:getpricemovie});
		});
	});	
}