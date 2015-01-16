var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	//res.send("dfsads");
  	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

    	connection.query('SELECT * FROM user', function(err, users){
      		if(err){ return next(err); }
      		res.render('users/index', {users: users});
    	});
  	});

});

module.exports = router;