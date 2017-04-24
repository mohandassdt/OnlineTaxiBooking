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
var customer=[];
var i,j;

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
    console.log(socket.id);
socket.on('user',function(data){
  console.log("reached customer details");
console.log(data.info.email);

  customer[socket.id] ={
Name:data.info.fname,
email:data.info.email,
phone:data.info.mobile,
idNo:socket.id

  }
})




    socket.on('driverdetails',function(data)
    {
    console.log(data);
    console.log(socket.id);
    drivers[socket.id]={
  lattitude:data.lat,
  Longitude:data.long,
    Name:data.Dname,
    type:data.cab,
    pnone:data.No,
    carno:data.cno,
    carname:data.cname,
    Email:data.mail,
    id:socket.id
  };
    console.log("driver added");
  console.log(drivers);
    socket.broadcast.emit('dd',{
      details:drivers[socket.id]
    });
    // console.log(details);
    // console.log("drivers details send");

  })

socket.on('driverMessage',function(data){

driverMessage:data.driverDetails

});

socket.on('customerdetails',function(data){
  console.log(data);
console.log(data.cabType);

// for(t in customer){
//   console.log(customer[t]);
//   console.log(customer[t].email);
//   if(data.mail==customer[t].email){
//     console.log("customer confirmed");
//
//   }}
    for(s in drivers){

  if(data.cabType==drivers[s].type){

    console.log(drivers[s].id);
    // console.log(socket.id);
    console.log("reached target in server inner");
// socket.on('ack',f)
    socket.to(drivers[s].id).emit('newCustomerMessage', {
      message:data

      });
      socket.to(customer[t].idNo).emit('newDriverMessage', {
        msg:drivers[s]
    });
console.log("cutomer id reached");
console.log(customer[t].idNo)



    console.log("details sent ot driver");

  }
    }

//
//   }
//
// }



})



socket.on('disconnect',function(){
  console.log("socket disconnected");
  socket.broadcast.emit("driverremoved",drivers[socket.id]);
  console.log(socket.id);
  delete drivers[socket.id];
  console.log(drivers);
})
// socket.broadcast.emit('details',{
//   newdetails:drivers[socket.id]
//   // console.log(drivers);
// })
// console.log(drivers);
  })


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
