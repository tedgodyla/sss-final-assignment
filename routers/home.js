var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

    	var opstelling = {
    		populair: 0,
    		nieuw: 0
    	}

    	// query moet nog veranderd worden
    	connection.query('SELECT * FROM team ', function(err, teams){
      		if(err){ return next(err); }
      		opstelling.populair = teams;
    	});

    	connection.query('SELECT * FROM team ORDER BY created_at DESC', function(err, teams){
      		if(err){ return next(err); }
      		opstelling.nieuw = teams;
    	});

    	res.render('index', {
			baseUrl: req.baseUrl,
			populair: opstelling.populair,
			nieuw: opstelling.nieuw
		});
  	});
});

module.exports = router;