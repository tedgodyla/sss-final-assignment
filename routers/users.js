var express = require('express');
var multer  = require('multer');
var crypto = require('crypto');
var router = express.Router();
var getQuery = require('../lib/query');

// PASSWORD SECURITY
var shasum = crypto.createHash('sha1');

// FILE UPLOAD
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
		      			if (user[0].name.toUpperCase() === username && user[0].email.toUpperCase() === email) {
		      				data.message = 'Deze username en emailadres zijn al in gebruik.';
		      			} else if (user[0].name.toUpperCase() === username) {
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

module.exports = router;