var express = require('express');
var router = express.Router();

// HOOFDMENU GEBRUIKER
router.get("/", function (req, res) {
  	if (req.session.userid) { 
    	var data = {
      		baseUrl: req.baseUrl,
    	}
    	res.render("users/", data);
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
    		var query = 'SELECT id, name FROM user WHERE name = "' + username + '" AND password = "' + password + '"';
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
    		var query = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
    			query+= 'LEFT JOIN formation ON formation.id = team.formations_id  ';
    			query+= 'WHERE user_id = "' + req.session.userid + '" ORDER BY created_at DESC';
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
    			//console.log(prop + " = " + obj[prop]);
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

	console.log(arr);

	if (!error){
		req.getConnection(function(err, connection){
    		if(err){ return next(err); }
			var query = 'INSERT INTO team (name, user_id, formations_id)';
				query+= ' VALUES (';
				query+=	'"' + data.invoer.titel + '",';
				query+=	req.session.userid + ','; 
				query+=	req.body.formatie;
				query+= ');';
			
	  		connection.query(query, function(err, user){
	      		if(err){ return next(err); }
	      		var query = 'SELECT MAX(id) AS id FROM team';
		  		connection.query(query, function(err, team){
		      		if(err){ return next(err); }
		      		var query = 'INSERT INTO team_has_player (team_id, player_id) ';
						query+= 'VALUES ('+team[0].id+','+req.body.p1+'), ';
						query+= '('+team[0].id+','+req.body.p2+'), ';
						query+= '('+team[0].id+','+req.body.p3+'), ';
						query+= '('+team[0].id+','+req.body.p4+'), ';
						query+= '('+team[0].id+','+req.body.p5+'), ';
						query+= '('+team[0].id+','+req.body.p6+'), ';
						query+= '('+team[0].id+','+req.body.p7+'), ';
						query+= '('+team[0].id+','+req.body.p8+'), ';
						query+= '('+team[0].id+','+req.body.p9+'), ';
						query+= '('+team[0].id+','+req.body.p10+'), ';
						query+= '('+team[0].id+','+req.body.p11+');';
					console.log(query);
		      		connection.query(query, function(err, bla){
		      			if(err){ return next(err); }
		      			res.redirect('/users/teams');
		      		});
		    	});
	    	});
	  	});
	} else {
		res.send('vul alle velden in');
	}
});

module.exports = router;