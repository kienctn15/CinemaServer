var http=require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');



var Customer=require('./routes/Customer');
var Movie=require('./routes/Movie');
var TicketPrice=require('./routes/TicketPrice');
var Schedule=require('./routes/Schedule');
var Home=require('./routes/Home');
var TicketInfo=require('./routes/TicketInfo');
var Staffs=require('./routes/Staffs');

var multer = require('multer');

var app = express();
passport.serializeUser(Staffs.serialize);
passport.deserializeUser(Staffs.deserialize);
passport.use(Staffs.strategy);

var Models = require('./models-sequelize/models_cinema');
Models.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });
Customer.configure(Models);
Movie.configure(Models);
TicketPrice.configure(Models);
Schedule.configure(Models);
Home.configure(Models);
TicketInfo.configure(Models);
Staffs.configure({Staffs:Models,passport:passport});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// upload file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/Image/film/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({storage: storage});


app.use(express.static("public"));
app.use(express.static(__dirname + '/'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'keyboard cat',
  proxy: true,
  resave: true,
  saveUninitialized: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', Staffs.doLogin);
app.post('/doLogin', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), Staffs.postLogin);
app.use('/logout', Staffs.doLogout);
app.use('/admin', Home.View);
app.post('/bookchair',Staffs.ensureAuthenticated, Home.Viewchair);
app.use('/quan-ly-khach-hang',Staffs.ensureAuthenticated,Customer.View);
app.use('/quan-ly-phim',Staffs.ensureAuthenticated, Movie.View);
app.use('/quan-ly-gia-ve',Staffs.ensureAuthenticated, TicketPrice.View);
app.use('/quan-ly-tao-lich-chieu',Staffs.ensureAuthenticated, Schedule.Viewfilm);
app.use('/danh-sach-lich-chieu',Staffs.ensureAuthenticated, Schedule.Viewschedule);
app.use('/quan-ly-in-ve',Staffs.ensureAuthenticated, TicketInfo.View);
app.get('/thong-ke-bao-cao',Staffs.ensureAuthenticated,TicketInfo.ViewMovie);
app.post('/thong-ke-bao-cao', Staffs.ensureAuthenticated,TicketInfo.ViewPriceMovie);
/*app.post('/customersave', Customer.Insert);*/
app.post('/customersave',Staffs.ensureAuthenticated,Customer.Insert);
app.use('/deleteCustomer',Staffs.ensureAuthenticated,Customer.Delete);
app.post('/filmsave',Staffs.ensureAuthenticated, upload.single('image'), Movie.Insert);
app.use('/deletefilm',Staffs.ensureAuthenticated,Movie.Delete);
app.post('/changeinfo', Staffs.ensureAuthenticated,TicketPrice.Change);
app.post('/Schedulesave',Staffs.ensureAuthenticated,Schedule.Insert);
app.post('/Scheduleupdate',Staffs.ensureAuthenticated,Schedule.Update);
app.use('/deleteschedule',Staffs.ensureAuthenticated,Schedule.Delete);
app.use('/set',Staffs.ensureAuthenticated,Home.ViewDaySchedule);
app.post('/ticketinfosave', Staffs.ensureAuthenticated, Home.InsertTicketinfo);
app.use('/updatePrint',Staffs.ensureAuthenticated,TicketInfo.UpdatePrint);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server = http.Server(app);
var io = require('socket.io').listen(server);
app.set('port', 3000);
server.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
 

io.sockets.on('connection', function(socket) {
  console.log("connected");

  Models.emitter.on('createmovie',function(){
    socket.emit('createmovie');
  });
  Models.emitter.on('createmoviefail',function(){
    socket.emit('createmoviefail');
  });
  Models.emitter.on('updatemovie',function(){
    socket.emit('updatemovie');
  });
  Models.emitter.on('updatemoviefail',function(){
    socket.emit('updatemoviefail');
  });
  Models.emitter.on('updateticketprice',function(){
    socket.emit('updateticketprice');
  });
  Models.emitter.on('updateticketpricefail',function(){
    socket.emit('updateticketpricefail');
  });
  Models.emitter.on('createschedule',function(){
    socket.emit('createschedule');
  });
  Models.emitter.on('createschedulefail',function(){
    socket.emit('createschedulefail');
  });
  Models.emitter.on('updateschedule',function(){
    socket.emit('updateschedule');
  });
  Models.emitter.on('updateschedulefail',function(){
    socket.emit('updateschedulefail');
  });
  Models.emitter.on('createticketinfo',function(){
    socket.emit('createticketinfo');
  });
  Models.emitter.on('checkOccupiedSeat06fail',function(){
    socket.emit('checkOccupiedSeat06fail');
  });
  Models.emitter.on('createticketinfofail',function(){
    socket.emit('createticketinfofail');
  });
  Models.emitter.on('updatestatus',function(){
    socket.emit('updatestatus');
  });
  Models.emitter.on('updatestatusfail',function(){
    socket.emit('updatestatusfail');
  });
  Models.emitter.on('schedulefail',function(){
    socket.emit('schedulefail');
  });
  Models.emitter.on('schedulefail06',function(){
    socket.emit('schedulefail06');
  });
  Models.emitter.on('chairfail',function(){
    socket.emit('chairfail');
  });
  socket.on('disconnect', function() {  
    });
  //mobile function----------------------------------------------------------------------------------------------------------
  socket.on("laydulieu", function(){
    Models.getAllMovie1(function(listmovie){
    socket.emit('data',{listmovie: listmovie});
    //console.log(listmovie);
    });
  });

  socket.on("getFeatureMovie", function(){
    Models.getFeatureMovie(function(listmovie){
      socket.emit('listFeatureMovie',{listmovie: listmovie});
    //console.log(listmovie);
    })
  });

  socket.on("getShowingMovie", function(){
    Models.getShowingMovie(function(listmovie){
      socket.emit('listShowingMovie',{listmovie: listmovie});
    //console.log(listmovie);
    })
  });

  socket.on("getComingMovie", function(){
    Models.getComingMovie(function(listmovie){
      socket.emit('listComingMovie',{listmovie: listmovie});
    //console.log(listmovie);
    })
  });

  socket.on("getAllScheduleByIdMovie", function(idmovie){
    Models.getAllScheduleByIdMovie(idmovie, function(scheduleList){
      console.log(scheduleList);
      socket.emit("scheduleList", {scheduleList: scheduleList});
    });
  });

  socket.on("getPrice", function(typeOfMovie, TimeFrame, typeOfDay, typeOfChair){
    Models.getOneTicketPrice(typeOfMovie, TimeFrame, typeOfDay,  typeOfChair, function(price){
      //console.log(price);
      socket.emit("priceOfSeat", {price: price});
    });
  });

  socket.on("getListPrice", function(typeOfMovie, TimeFrame, typeOfDay, typeOfChair){
    Models.getOneTicketPrice(typeOfMovie, TimeFrame, typeOfDay, typeOfChair, function(price){
      //console.log(price);
      socket.emit("ListpriceOfSeat", {price: price});
    });
  });

  socket.on("getPriceOneTicket", function(typeOfMovie, TimeFrame, typeOfDay, typeOfChair){
    Models.getOneTicketPrice(typeOfMovie, TimeFrame, typeOfDay, typeOfChair, function(price){
      //console.log(price);
      socket.emit("priceOfSeatOne", {price: price});
    });
  });

  socket.on("getOneTicketInfo",function(idmovie, timeframe, date){
    Models.getOneTicketInfo(idmovie, timeframe, date, function(ticketinfos){
      //console.log(ticketinfos);
      //socket.emit("TicketInfo", {namechair: ticketinfos.namechair});
    });
  });

  socket.on("placeOrder", function(data, id_time, date, room, seat){
      //console.log(seat);
  });

  socket.on("signin", function(username, password){
    Models.CheckLogin(username, password, function(result, user){
        socket.emit("result_signin", {result:result, user: user});
    });
  });

  socket.on("Receipt", function(idmovie, nameseat, typeOfSeat, id_time, date, idcustomer, room, typeofday, typeofmovie){
    var i = 0;
    nameseat.forEach(function(namechair){
      var typeSeat = typeOfSeat[i].typeSeat;
      if(id_time >= 4){
        var frame_id = 1;
      }else{
        var frame_id = 2;
      }
      Models.getOneTicketPrice(typeofmovie, frame_id, typeofday , typeSeat , function(ticket){
        Models.createTicketInfo(date, id_time, typeSeat, namechair.nameChair, room, idcustomer, idmovie, ticket.price, function(result){
          socket.emit("resultReceipt");
        });
      }) 
      i++;
    });
  });

  socket.on("getOccupiedSeat", function(date, room, id_time){
      Models.getOccupiedSeat(date, room, id_time, function(ticketinfoList){
        socket.emit("resultOccupiedSeat",{ticketinfoList: ticketinfoList});
      });
  });

  socket.on('signup',function(jsonObject){
      Models.findByUsernameSignUp1(jsonObject.user,function(result){
        if(result){
          Models.customer_signup_android(jsonObject.user,jsonObject.pass,jsonObject.email,jsonObject.phone,jsonObject.fullname,jsonObject.passport,jsonObject.address,function(result1){
            socket.emit('result_signup',{result1:result1, flag: 1});
          });
        }else{
          console.log("tai khoan da ton tai!");
          socket.emit('result_signup',{flag: 0});
        }
      });
    });

    //Send mail function
  socket.on('sendMailChangePass',function(jsonObject){
       Models.findByEmailSignup(jsonObject.email,function(result){
        if(result){
          Models.sendMail(jsonObject.email,function(result1){
            if(result1){
              Models.emitter.on('appjs_call_server_send_code', function(email,code,result2){
          
       
          console.log(email);
          console.log(code);
          console.log(result1);
          console.log(result2);
        
            socket.emit('server_send_code_change_pass',{code:code,email:email});
          
        });
           
            }
          });
           
        }else{
         //   socket.emit('result_sendmail',{result_sendmail:result});  // mail = false ==> mail sai
        }

       });
  });

  socket.on('rmkpass',function(email, password){
    Models.updateUserPassword(email, password, function(result){
        
    });
  });       
});
