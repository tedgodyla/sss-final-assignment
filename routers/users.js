var express = require('express');
var multer  = require('multer');
var router = express.Router();
//var fs = require('fs');
//var gm = require('gm');
var getQuery = require('../lib/query');

router.use(multer({
  dest: './uploads/'
}))

// HOOFDMENU GEBRUIKER
router.get("/", function (req, res) {
  	if (req.session.userid) { 
    	var data = {
      		baseUrl: req.baseUrl,
    	}
    	req.getConnection(function(err, connection){
    		if(err){ return next(err); }
    		var userid = req.session.userid;
    		var query = getQuery.selectCommentsForUser(userid, 8);
	  		connection.query(query, function(err, comments){
	      		if(err){ return next(err); }
	      		data.comments = comments;
    			res.render("users/", data);
    	  	});
	  	});
  	} else {
	    res.redirect(req.baseUrl + "/login");
  	}
});

// UITLOGGEN
router.get("/logout", function(req, res){
	req.session.destroy();
	res.redirect('/');
});

// INLOGGEN GET
router.get("/login", function(req, res){
	var data = { baseUrl: req.baseUrl, message: '' }
  	res.render("users/login", data);
});

// INLOGGEN POST
router.post("/login", function(req, res){
  	var username = req.body.username;
  	var password = req.body.password;
  	var data = { baseUrl: req.baseUrl, message: '' }

  	if (username && password) {
  		req.getConnection(function(err, connection){
    		if(err){ return next(err); }
    		var query = getQuery.selectUser(username, password);
	  		connection.query(query, function(err, user){
	      		if(err){ return next(err); }
	      		if (user[0]){
		      		req.session.userid = user[0].id;
		      		req.session.username = user[0].name;
		    		res.redirect('/users');
	    		} else {
	    			data.message = 'Ongeldig gebruikersnaam of wachtwoord';
	    			res.render("users/login", data);
	    		}
	    	});
	  	});
  	} else {
    	data.message = 'Vul een gebruikersnaam en wachtwoord in';
    	res.render("users/login", data);
  	}
});

// REGISTREREN GET
router.get("/signup", function(req, res){
	var data = { 
    	baseUrl: req.baseUrl,
    	message: ''
  	}
  	res.render("users/signup", data);
});

// REGISTREREN POST
router.post("/signup", function(req, res){
  	var username = req.body.username;
  	var email = req.body.email;
  	var password1 = req.body.password1;
  	var password2 = req.body.password2;
  	var data = { 
  		baseUrl: req.baseUrl, 
  		message: ''
  	};

  	if (username && email && password1 && password2) {
  		if (password1 === password2) {
	  		req.getConnection(function(err, connection){
	    		if(err){ return next(err); }
	    		var query = 'SELECT id, name, email FROM user WHERE name = "' + username + '" OR email = "' + email + '"';
		  		connection.query(query, function(err, user){
		      		if(err){ return next(err); }

		      		if (user[0] && user[1]) {
		      			data.message = 'Deze username en emailadres zijn al in gebruik.';
		      			res.render("users/signup", data);
		      		} else if (user[0]){
		      			if (user[0].name === username && user[0].email === email) {
		      				data.message = 'Deze username en emailadres zijn al in gebruik.';
		      			} else if (user[0].name === username) {
			      			data.message = 'Deze username is al in gebruik.';
			    		} else {
			    			data.message = 'Dit emailadres is al in gebruik.';
			    		}
			    		res.render("users/signup", data);
			    	} else {
			    		var query = 'INSERT INTO user (name, password, email) VALUES ("' + username + '", "' + password1 + '", "' + email + '")';
				  		connection.query(query, function(err, user){
				      		if(err){ return next(err); }
				      		var query = 'SELECT id FROM user WHERE name = "' + username + '"';
					  		connection.query(query, function(err, user){
					      		if(err){ return next(err); }
					      		req.session.userid = user[0].id;
				      			req.session.username = username;
				    			res.redirect('/users');
					    	});
				    	});
		    		}
		    	});
		  	});
  		} else {
  			data.message = 'De twee wachtwoorden moeten overeenkomen';
  			res.render("users/signup", data);
  		}
  	} else {
  		data.message = 'Vul alle velden in';
  		res.render("users/signup", data);
  	}
});

// TEAM OVERZICHT
router.get("/teams", function(req, res){
	if (req.session.userid) { 
		req.getConnection(function(err, connection){
    		if(err){ return next(err); }
    		var user = req.session.userid;
    		var query = getQuery.selectUserTeams(user);
	  		connection.query(query, function(err, teams){
	      		if(err){ return next(err); }
	      		var data = {
	      			baseUrl: req.baseUrl,
	      			teams: teams
	      		}
	      		res.render("users/teams", data);
	    	});
	  	});
  	} else {
    	res.redirect(req.baseUrl + "/login");
  	}
});

router.get("/:id", function(req, res){
	var index = parseInt(req.params.id, 10);
	req.getConnection(function(err, connection){
		if(err){ return next(err); }
		var user = index;
		var query = getQuery.selectUserTeams(user);
  		connection.query(query, function(err, teams){
      		if(err){ return next(err); }
      		var data = {
      			baseUrl: req.baseUrl,
      			teams: teams
      		}
      		var query = getQuery.selectCommentsFromUser(user, 5);
  			connection.query(query, function(err, comments){
  				data.comments = comments;
  				res.render("users/view", data);
  			});
    	});
  	});
});

// TEAM AANMAKEN GET
router.get("/teams/new", function(req, res){
	if (req.session.userid) { 
		req.getConnection(function(err, connection){
    		if(err){ return next(err); }
    		var query = 'SELECT id,name FROM player';
	  		connection.query(query, function(err, players){
	      		if(err){ return next(err); }
	      		var data = {
	      			baseUrl: req.baseUrl,
	      			players: players
	      		}
	      		res.render("users/new_team", data);
	    	});
	  	});
  	} else {
    	res.redirect(req.baseUrl + "/login");
  	}
});

// TEAM AANMAKEN POST
router.post("/teams/new", function(req, res){
	var error = false;
  	var data = { 
  		baseUrl: req.baseUrl, 
  		message: '',
  		invoer: req.body
  	};

  	var arr = [];

  	for (var key in data) {
   		var obj = data[key];
		for (var prop in obj) {
	    	if (obj.hasOwnProperty(prop)){
    			if (!obj[prop]){
    				error = true;
    			} else {
    				if (prop.charAt(0) === 'p'){
    					for (var i = 0; i < arr.length; i++){
    						if (arr[i] === obj[prop]){
    							error = true;
    						}
    					}
    					arr.push(obj[prop]);
    				}
    			}
  			}
		}
	}

	if (!error){
		req.getConnection(function(err, connection){
    		if(err){ return next(err); }
    		console.log(req);
    		var titel = data.invoer.titel;
    		var user = req.session.userid;
    		var formatie = req.body.formatie;
    		res.send('dfas');
    	// 	var query = getQuery.insertTeam(titel, user, formatie);
	  		// connection.query(query, function(err, user){
	    //   		if(err){ return next(err); }
	    //   		var query = getQuery.lastInsertedId('team');
		  	// 	connection.query(query, function(err, team){
		   //    		if(err){ return next(err); }
		   //    		var teamid = team[0].id;
		   //    		var body = req.body;
		   //    		var query = getQuery.insertPlayersInTeam(teamid, body)
		   //    		connection.query(query, function(err, bla){
		   //    			if(err){ return next(err); }
		   //    			console.log(req.files);
		   //    			var upload = req.files.upload;
					// 	console.log(upload);
					// 	//gm('/path/to/my/img.jpg').options({imageMagick: true}).resize(240, 240);

		   //    			res.redirect('/users/teams');
		   //    		});
		   //  	});
	    // 	});
	  	});
	} else {
		res.send('vul alle velden in');
	}
});

module.exports = router;