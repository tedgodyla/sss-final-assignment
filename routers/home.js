var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

    	var opstelling = {
    		populair: 0,
    		nieuw: 0
    	}

    	var query = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
      query+= 'LEFT JOIN formation ON formation.id = team.formations_id ';
      query+= 'ORDER BY created_at DESC LIMIT 0,4';
    	connection.query(query, function(err, teams){
      		if(err){ return next(err); }
      		opstelling.populair = teams;

          var query = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
          query+= 'LEFT JOIN formation ON formation.id = team.formations_id ';
          query+= 'ORDER BY created_at DESC LIMIT 0,4';
          connection.query(query, function(err, teams){
              if(err){ return next(err); }
              opstelling.nieuw = teams;

              res.render('index', {
                baseUrl: req.baseUrl,
                populair: opstelling.populair,
                nieuw: opstelling.nieuw
              });
          });
    	});
  	});
});

module.exports = router;