var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var myConnection = require('express-myconnection');

//  =================
//  = Setup the app =
//  =================

// The app itself
var app = express();
var server = http.Server(app);
var io = socketIo(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  ============================
//  = Middleware configuration =
//  ============================

// Setup serving static assets
app.use(express.static(path.join(__dirname, 'public')));

// Add session support
app.use(session({
	secret: 'jnfrejqvjqiodnfiwqio', // CHANGE THIS!!!
	store: new FileStore(),
	saveUninitialized: true,
	resave: false
}));

// Setup bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Setup Multer
// app.use(multer({
// 	dest: './uploads/'
// }));

// Setup MySQL

// Database configuration
var dbOptions = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'notejs'
};

// Add connection middleware
app.use(myConnection(mysql, dbOptions, 'single'));

// get session
app.use(function(req, res, next) {
	res.locals.userid = null
	res.locals.username = null

	if (req.session){
		res.locals.userid = req.session.userid
		res.locals.username = req.session.username
	}
	next();
});

//  ===========
//  = Routers =
//  ===========
var usersRouter = require('./routers/users');
var clubsRouter = require('./routers/clubs');
var homeRouter = require('./routers/home');
var teamsRouter = require('./routers/teams');
var uploadRouter = require('./routers/upload');

app.use('/users', usersRouter);
app.use('/clubs', clubsRouter);
app.use('/teams', teamsRouter);
app.use('/upload', uploadRouter);
app.use('/users/teams/new', uploadRouter);
app.use('/', homeRouter);

// This should be the ONLY route in this file!
// app.get('/', function(req, res){
//   	res.render('index', {
// 		baseUrl: req.baseUrl,
// 	});
// });

//  =================
//  = Start the app =
//  =================

server.listen(3000, function(){
	console.log('App listening at http://localhost:3000');
});

//  =================
//  = IO dingen =
//  =================

io.on("connection", function(socket){
  // New connection!
  socket.emit("welcome", "Hello!");

  socket.on("message", function(data){
    //console.log("Message received:", data);
    io.emit("message", data)
  });

  socket.on("disconnect", function(){
    //console.log("Disconnect")
  })
})