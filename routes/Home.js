var model = undefined;
var S = require('string');

exports.configure = function(params) {
    model = params;
}
exports.View=function(req,res,next){
	if(req.user != undefined){
    	res.render('admin_home', {dayschedule:undefined, user:req.user});
	}else{
		res.redirect("/login");
	}
}
exports.Viewchair=function(req,res,next){
	var idmovie=req.body.setidmovie,
	idschedule=req.body.setschedule,
	time=req.body.settime,
	idroom=req.body.setroom,
	showday=req.body.setday;
	console.log(" nao nao nao "+idschedule);
	model.getNameChair(showday,time,idmovie,idroom,function(namechair){

		res.render('admin_chair',{namechair:namechair,idmovie:idmovie, idschedule:idschedule, time:time, idroom:idroom, showday:showday, user:req.user});
	});
	
	
}

var week;
exports.ViewDaySchedule=function(req,res,next){
	console.log(req.query.day);
	week=req.query.week;
	model.getDaySchedule(req.query.day , function(dayschedule){		
		res.render('admin_home',{dayschedule:dayschedule, user:req.user});
	})
}

exports.InsertTicketinfo=function(req,res,next){
	var time;
	var typeday;
	if(week<5){
   			typeday=1;
 				}
 	else{
  			typeday=1;
 		}
  		if(req.body.settime<4){
     		time=1;
   		}
   		else
   		{
     		time=2;
   		}
	console.log(req.body.setidmovie);
	console.log(req.body.setroom);
	console.log(req.body.settime);
	console.log(req.body.setnamechair);
	console.log(req.body.setday);
	console.log(req.body.settypechair);


				model.readMovie(req.body.setidmovie,function(movie){
					model.getOneTicketPrice(movie.format, time,typeday, req.body.settypechair, function(ticket){
							var str = req.body.listChair;
							var arr = str.split(",");
							for(var i=0; i<arr.length; i++) {
								model.checkOccupiedSeat06(req.body.setday, req.body.settime, req.body.settypechair, arr[i], req.body.setroom, function(result, nameChair){
									if(!result){
										model.createTicketInfo(req.body.setday, req.body.settime, req.body.settypechair, nameChair.namechair, req.body.setroom,'-1',req.body.setidmovie,ticket.price,function(ticketinfo){
											res.redirect('/quan-ly-in-ve');
										});
									}else{
										console.log("Dat roi!----------------------------");
										res.redirect('/admin');
									}
								});
							}							
					});
			
				});
}

		