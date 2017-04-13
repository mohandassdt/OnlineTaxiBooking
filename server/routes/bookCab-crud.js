var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

var BookCabSchema = mongoose.Schema({
  id:String,
    sourceLoc:String,
   DesinationLoc:String,
   Type:String,
  Landmark1:String,
  Landmark2:String,
  amount:String,
   Pickdate:String,
   PickTime:String

   });

var BookCab = mongoose.model('BookCab', BookCabSchema, 'BookingTable');




router.get('/bkc', function (req, res,next) {
   console.log("REACHED GET FUNCTION ON SERVER");

   BookCab.find({}, function (err, docs) {
        res.json(docs);
        console.log(docs);

   });
});

router.get('/bkc/:id', function (req, res) {
   console.log("REACHED GET ID FUNCTION ON SERVER");
    BookCab.find({_id: req.params.id}, function (err, docs) {
        res.json(docs);

   });
});

router.post('/bkc', function(req, res){
 console.log(req.body);
var idno = req.body.id;
   var srce = req.body.sourceLoc;
   var dest = req.body.DesinationLoc;
   var typ = req.body.Type;
   var land1 = req.body.Landmark1;
   var land2 = req.body.Landmark2;
   var amnt = req.body.amount;
   var date = req.body.Pickdate;
   var time = req.body.PickTime;


  var bcab1 = new BookCab({
   id:idno,
   sourceLoc:srce,
   DesinationLoc:dest,
   Type:typ,
   Landmark1:land1,
  Landmark2:land2,
  amount:amnt,
  Pickdate:date,
  PickTime:time

 });


 bcab1.save(function(err, docs){
   if ( err ) throw err;
   console.log("Book Saved Successfully");
   res.json(docs);
 });

 })



router.delete('/bkc/:id', function(req, res){
  console.log("REACHED Delete FUNCTION ON SERVER");
     BookCab.remove({_id:req.params.id}, function(err, docs){
       res.json(docs);
   });
})

router.put('/bkc/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   BookCab.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
   });
})

router.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


module.exports = router;
