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
var server=require('http').Server(app);
var io=require('socket.io').listen(server);
var drivers=[];
var i;

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

// io.on('connection', function(socket){
//     console.log('a user connected: ' + socket.id);
//     socket.on('disconnect', function(){
//         console.log( socket.name + ' has disconnected from the chat.' + socket.id);
//     });
//     socket.on('join', function (name) {
//         socket.name = name;
//         console.log(socket.name + ' joined the chat.');
//     });
// });

io.on('connection',function(socket){

  console.log("socket connected")
  // console.log(socket.id);
  // console.log("socket id send to driver ctrller");
    console.log(socket.id);})
  // socket.emit('ID',{
  //
  //   sid:socket.id
  // })
  // socket.on('myMessage',function(data){
  //   console.log(data.message);
  //   socket.broadcast.emit('newMessage',{
  //     message:data.message
  //   })
  // })
//   socket.on('disconnect',function(){
//     console.log("disconnect");
//
//     console.log(socket.id);
//     socket.broadcast.emit('close',function()  {
//     for(i=0;i<drivers.length;i++)
//     {
//     if(drivers[i].socketid=socket.id){
//       console.log(drivers[i]);
//       delete drivers[i];}
//     }
//
//     console(drivers);
//     dd:drivers
//   })

  socket.on('driverdetails',function(data)
{
  console.log(data);
console.log(socket.id);
drivers[socket.id]={
  latitude:data.lat,
  Longitude:data.long,
  Name:data.Dname,
  type:data.cab,
  pnone:data.No,
  carno:data.cno,
  carname:data.cname,
Email:data.mail
};
console.log("driver added");
// drivers.push(data);
console.log(drivers);
socket.broadcast.emit('dd',drivers[socket.id]);
})
//
//   // if(drivers.indexOf(data) === -1){
//   //     drivers.sh(drivers);
//   // drivers.push(data);
//   console.log("drivers add saved");
// })





  //
  // socket.on('customerBookMessage',function(data){
  //   console.log(data.customerdata);
  //   socket.broadcast.emit('newCustomerMessage',{
  //     message:data.customerdata
  //   })
  // })

// })
// app.use('/apidr', DriverRoute);
app.use('/api', UserRoute);
app.use('/drive', DriverRoute);
app.use('/crtype', cartypeRoute);
app.use('/bil', billRoute);
app.use('/bkc', bookCabRoute);
app.use('/cnfm', confirmRoute);
app.use('/asgn', assignRoute);



server.listen(5000, function(req, res) {
    console.log('Server is running on port 5000...');
});
