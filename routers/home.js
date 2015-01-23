var express = require('express');
var router = express.Router();
var getQuery = require('../lib/query');

router.get('/', function(req, res){
	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

    	var opstelling = {
    		populair: 0,
    		nieuw: 0
    	}

    	var query = getQuery.selectHotTeams(3);
    	connection.query(query, function(err, teams){
      		if(err){ return next(err); }
      		opstelling.populair = teams;

          var query = getQuery.selectNewTeams(3);
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