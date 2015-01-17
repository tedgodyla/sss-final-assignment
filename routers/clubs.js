var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

    	connection.query('SELECT * FROM club', function(err, clubs){
      		if(err){ return next(err); }
      		res.render('clubs/index', {
      			baseUrl: req.baseUrl,
      			clubs: clubs
      		});
    	});
  	});
});

router.get("/:id", function (req, res) {
	var index = parseInt(req.params.id, 10);

	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

    	connection.query('SELECT * FROM player WHERE club_id = ' + index, function(err, players){
      		if(err){ return next(err); }
      		res.render('clubs/players', {players: players});
    	});
  	});
});

module.exports = router;