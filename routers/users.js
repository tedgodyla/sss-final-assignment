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

module.exports = router;