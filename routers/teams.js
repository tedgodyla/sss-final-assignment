var express = require('express');
var router = express.Router();

// TEAM OVERZICHT
router.get("/", function(req, res){
	req.getConnection(function(err, connection){
		if(err){ return next(err); }
		var query = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
			query+= 'LEFT JOIN formation ON formation.id = team.formations_id ';
			query+= 'ORDER BY created_at DESC';
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
		var query = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
			query+= 'LEFT JOIN formation ON formation.id = team.formations_id ';
			query+= 'ORDER BY created_at DESC LIMIT 0,10';
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
		var query = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
			query+= 'LEFT JOIN formation ON formation.id = team.formations_id ';
			query+= 'ORDER BY created_at DESC LIMIT 0,10';
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

/*

  SELECT team.id, team.name, team.created_at,
  user.name AS 'user_name', user.id AS 'user_id', 
  formation.name AS 'formatie_name',
  player.name AS 'player_name',
  club.name AS 'club_name',
  preffered_role.name AS 'preffered_role_name'
  FROM team
  LEFT JOIN user
  ON team.user_id = user.id 
  LEFT JOIN formation
  ON team.formations_id = formation.id
  LEFT JOIN team_has_player
  ON team.id = team_has_player.team_id
  LEFT JOIN player
  ON team_has_player.player_id = player.id
  LEFT JOIN club
  ON player.club_id = club.id
  LEFT JOIN preffered_role
  ON player.preffered_role_id = preffered_role.id
  WHERE team.id = 9

*/

router.get("/:id", function (req, res) {
	var index = parseInt(req.params.id, 10);

  res.send('index');

	// req.getConnection(function(err, connection){
 //    if(err){ return next(err); }

	// 	var query = 'SELECT * FROM player WHERE club_id = ' + index;
	// 	connection.query(query, function(err, players){
	// 		if(err){ return next(err); }
	// 		var data = {
 //      			baseUrl: req.baseUrl,
 //      			teams: teams
 //      		}
	// 	});
 //  });
});

module.exports = router;