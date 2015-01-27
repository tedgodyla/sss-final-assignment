var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

      var query = 'SELECT * FROM club';
    	connection.query(query, function(err, clubs){
      		if(err){ return next(err); }
      		res.render('clubs/index', {
      			baseUrl: req.baseUrl,
      			clubs: clubs
      		});
    	});
  	});
});

router.get("/:id", function (req, res) {
  console.log(req);
	var index = parseInt(req.params.id, 10);

	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

      var query = 'SELECT club.name AS club_name, player.name, player.number, preffered_role.name AS role FROM player LEFT JOIN preffered_role ON player.preffered_role_id = preffered_role.id LEFT JOIN club ON player.club_id = club.id WHERE club_id = ' + index;
    	connection.query(query, function(err, players){
      		if(err){ return next(err); }
      		res.render('clubs/players', {
            club: players[0].club_name,
            players: players
          });
    	});
  	});
});

module.exports = router;