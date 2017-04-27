var ticketprice = undefined;

exports.configure = function(params) {
    ticketprice = params;
}

exports.View=function(req,res,next){
	ticketprice.getAllTicketPrice(function(data){
		res.render('admin_ticketprice',{data:data, user:req.user});
	})
}
exports.Change=function(req,res,next){
	ticketprice.updateTicketprice(req.body.idticketprice,req.body.changeprice,req.body.changestatus,function(){
		res.redirect('./quan-ly-gia-ve');
	});
}

