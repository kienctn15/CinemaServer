var model=undefined;

exports.configure = function(params) {
    model = params;
}
exports.Viewfilm=function(req,res,next){
	model.getAllMovieStatus(function(movie){
		res.render('admin_schedule',{movie:movie,user:req.user});
	})
}
exports.Insert=function(req,res,next){
	model.getOneSchedule(req.body.showday,req.body.time,req.body.roomschedure,function(getoneschedule){
		if(getoneschedule){
			res.redirect('/quan-ly-tao-lich-chieu');
		}
		else{

			model.createSchedule(req.body.showday,req.body.time,req.body.roomschedure,req.body.idfilm,function(err){
					if(err){
						res.redirect('/quan-ly-tao-lich-chieu');
							}
					else{
						res.redirect('/quan-ly-tao-lich-chieu');
						}
			});
		}
	});
	}
exports.Viewschedule=function(req,res,next){
	model.getAllSchedule(function(schedules){
		 res.render('admin_listschedule',{schedules:schedules,user:req.user});	
	})
}
exports.Update=function(req,res,next){
	model.getOneSchedule(req.body.showday,req.body.time,req.body.roomschedure,function(getoneschedule){
		if(getoneschedule){
			res.redirect('/quan-ly-tao-lich-chieu');
		}
		else{
				model.updateSchedule(req.body.idschedule,req.body.showday,req.body.time,req.body.roomschedure,req.body.status, function(err){
				if(err){
					res.redirect('/danh-sach-lich-chieu');
					}
				else{
					res.redirect('/danh-sach-lich-chieu');
					}
				});
	}
	});
}
exports.Delete=function(req,res,next){
	model.destroySchedule(req.query.id, function(result){
		res.redirect('/danh-sach-lich-chieu');
	});
}
/*exports.Viewdayschedule=function(req,res,next){
	model.getDaySchedule(req.query.day,function(movie){
		res.render('admin_schedule',{movie:movie});
	})
	console.log(req.query.day);
}*/

