console.log("Starting node..")

// set up ======================================================================================
var express     = require('express');
var app         = express();
var port        = process.env.PORT || 8642;
var path        = require('path');

// configuration ===============================================================================
app.use(express.static(__dirname + '/public'));

// routes ======================================================================================
require('./app/routes')(app);

// listen ======================================================================================
app.listen(port);
console.log("App listening on port " + port);