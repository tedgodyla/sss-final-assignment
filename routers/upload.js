var express = require('express');
var multer  = require('multer')
var router = express.Router();
var fs = require('fs');
var gm = require('gm');

gm('/uploads/e3d99ba22101093dccf42a4a074fcce8.jpg').resize(200, 200).write('/uploads/e3d99ba22101093dccf42a4a074fcce8.jpg', function (err) {
  if (!err) console.log(' hooray! ');
});

router.use(multer({
  dest: './uploads/'
}))

router.get("/", function (req, res) {
  // ingelogd
  if(req.session.username){ 
    var data = { 
      title: 'Image upload',
      username: req.session.username,
    }
    res.render("users/upload", data);
  } 
  // niet ingelogd
  else {
    res.redirect("/users");
  }
});

router.post("/", function (req, res){
  //ingelogd
  if(req.session.username){ 
    var upload = req.files.upload;
    console.log(req.files.image.path);
    gm('/'+req.files.image.path).resize(240, 240);
    res.redirect('/upload');
  } 
  // niet ingelogd
  else {
    res.redirect("/users");
  }
});

module.exports = router;