var express = require('express');
var router = express.Router();
var getQuery = require('../lib/query');

// TEAM OVERZICHT
router.get("/", function(req, res){
	req.getConnection(function(err, connection){
		if(err){ return next(err); }
    var query = getQuery.allTeams;
		connection.query(query, function(err, teams){
    		if(err){ return next(err); }
    		var data = {
    			title: 'Alle teams',
    			baseUrl: req.baseUrl,
    			teams: teams
    		}
    		res.render("teams", data);
  	});
	});
});

router.get("/new", function(req, res){
	req.getConnection(function(err, connection){
		if(err){ return next(err); }
		var query = getQuery.newTeams;
		connection.query(query, function(err, teams){
    		if(err){ return next(err); }
    		var data = {
    			title: 'Nieuwe teams',
    			baseUrl: req.baseUrl,
    			teams: teams
    		}
    		res.render("teams", data);
  	});
	});
});

router.get("/hot", function(req, res){
	req.getConnection(function(err, connection){
		if(err){ return next(err); }
		var query = getQuery.hotTeams;
		connection.query(query, function(err, teams){
    		if(err){ return next(err); }
    		var data = {
    			title: 'Populaire teams',
    			baseUrl: req.baseUrl,
    			teams: teams
    		}
    		res.render("teams", data);
  	});
	});
});


router.get("/:id", function (req, res) {
	var index = parseInt(req.params.id, 10);

	req.getConnection(function(err, connection){
    if(err){ return next(err); }
		var query = getQuery.teamById(index);
		connection.query(query, function(err, team){
			if(err){ return next(err); }
      console.log(team[0].formatie_name);
			var data = {
  			baseUrl: req.baseUrl,
  			team: team,
        name: team[0].name,
        user_name: team[0].user_name,
        created_at: team[0].created_at,
        formatie: team[0].formatie_name
  		}

      res.render("teams/team", data);
		});
  });
});

module.exports = router;