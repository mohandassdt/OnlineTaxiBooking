var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var UserRoute = require('./server/routes/userRoute.js');
var DriverRoute = require('./server/routes/driver-crud.js');
var cartypeRoute = require('./server/routes/Cartype-crud.js');
var assignRoute = require('./server/routes/assign-crud.js');
var bookCabRoute = require('./server/routes/bookCab-crud.js');
var confirmRoute = require('./server/routes/cnfrm-crud.js');
var billRoute = require('./server/routes/billing-crud.js');


app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './client')));
mongoose.connect('mongodb://localhost:27017/cabapp');
var db = mongoose.connection;

db.on('open', function() {
    console.log('App is connected to database');
});

db.on('error', function(err) {
    console.log(err);
});
// app.use('/apidr', DriverRoute);
app.use('/api', UserRoute);
app.use('/drive', DriverRoute);
app.use('/crtype', cartypeRoute);
app.use('/bil', billRoute);
app.use('/bkc', bookCabRoute);
app.use('/cnfm', confirmRoute);
app.use('/asgn', assignRoute);
app.listen(5000, function(req, res) {
    console.log('Server is running on port 5000...');
});
