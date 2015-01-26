var express = require('express');
var multer  = require('multer')
var router = express.Router();
var getQuery = require('../lib/query');

router.use(multer({
  dest: './uploads/'
}))

router.get("/", function (req, res){
  if (req.session.userid) { 
    req.getConnection(function(err, connection){
        if(err){ return next(err); }
        var query = 'SELECT id, name FROM player';
        connection.query(query, function(err, players){
            if(err){ return next(err); }
            var data = {
              baseUrl: req.baseUrl,
              players: players
            }
            res.render("users/new_team", data);
        });
      });
    } else {
      res.redirect(req.baseUrl + "/login");
    }
});

// TEAM AANMAKEN POST
router.post("/", function(req, res){
  var error = false;
  var data = { 
    baseUrl: req.baseUrl, 
    message: '',
    invoer: req.body
  };

  console.log(data);

  var arr = [];

  for (var key in data) {
    var obj = data[key];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)){
        if (!obj[prop]){
          error = true;
        } else {
          if (prop.charAt(0) === 'p'){
            for (var i = 0; i < arr.length; i++){
              if (arr[i] === obj[prop]){
                error = true;
              }
            }
            arr.push(obj[prop]);
          }
        }
      }
    }
  }

  if (!error){
    req.getConnection(function(err, connection){
      if(err){ return next(err); }
      var upload = req.files.upload;
      var titel = data.invoer.titel;
      var user = req.session.userid;
      var formatie = req.body.formatie;
      if (req.files.image){
        var file_name = req.files.image.name;
      } else {
        var file_name = 'default.png';
      }
      console.log(titel);
      console.log(file_name);
      var query = getQuery.insertTeam(titel, user, formatie, file_name);
      connection.query(query, function(err, user){
        if(err){ return next(err); }
        var query = getQuery.lastInsertedId('team');
        connection.query(query, function(err, team){
          if(err){ return next(err); }
          var teamid = team[0].id;
          var body = req.body;
          var query = getQuery.insertPlayersInTeam(teamid, body)
          connection.query(query, function(err, bla){
            if(err){ return next(err); }
            res.redirect('/users/teams');
          });
        });
      });
    console.log(query);
    });
  } else {
    res.send('vul alle velden in');
  }
});

module.exports = router;