var express = require('express');
var router = express.Router();
var getQuery = require('../lib/query');

// TEAM OVERZICHT
router.get("/", function(req, res){
	req.getConnection(function(err, connection){
		if(err){ return next(err); }
    var query = getQuery.selectAllTeams;
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
		var query = getQuery.selectNewTeams;
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
		var query = getQuery.selectHotTeams;
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
  // console.log(req);

	req.getConnection(function(err, connection){
    if(err){ return next(err); }
		var query = getQuery.selectTeamById(index);
		connection.query(query, function(err, team){
			if(err){ return next(err); }
			var data = {
  			baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
  			team: team,
        name: team[0].name,
        creator_name: team[0].user_name,
        created_at: team[0].created_at,
        formatie: team[0].formatie_name,
        user_id: req.session.userid,
        user_name: req.session.username,
  		}

      var query = getQuery.selectComments(index);
      connection.query(query, function(err, comments){
        if(err){ return next(err); }
        data.comments = comments;
        res.render("teams/team", data);
      });
		});
  });
});

router.post("/:id", function (req, res) {
  var index = parseInt(req.params.id, 10);
  var user = (req.session.userid) ? req.session.userid : 0;
  var text = req.body.text;
  var query = getQuery.insertComment(index, user, text);
  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    connection.query(query, function(err, comment){
      if(err){ return next(err); }
      res.redirect(req.originalUrl + '#latest');
    });
  });
});

module.exports = router;