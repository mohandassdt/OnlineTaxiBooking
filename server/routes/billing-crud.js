var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

var BillSchema = mongoose.Schema({

  customerId:String,
   dId:String,
    sourcePlace:String,
   DesinationPlace:String,
   crType:String,
  Landmark1:String,
  Landmark2:String,
   pickdate:String,
   pickTime:String,
   name:String,
   mail:String,
   amount:String,
   mobile:String

   });

var bill = mongoose.model('bill', BillSchema, 'billTable');




router.get('/bil', function (req, res,next) {
   console.log("REACHED GET FUNCTION ON SERVER");

   bill.find({}, function (err, docs) {
        res.json(docs);
        console.log(docs);

   });
});

router.get('/bil/:id', function (req, res) {
   console.log("REACHED GET ID FUNCTION ON SERVER");
    bill.find({_id: req.params.id}, function (err, docs) {
        res.json(docs);

   });
});

router.post('/bil', function(req, res){
 console.log(req.body);
 var cuidno = req.body.customerId;
var idno = req.body.dId;
   var srce = req.body.sourcePlace;
   var dest = req.body.DesinationPlace;
   var typ = req.body.crType;
   var land1 = req.body.Landmark1;
   var land2 = req.body.Landmark2;
   var time = req.body.pickTime;
   var date = req.body.pickdate;
   var nme = req.body.name;
   var amnt = req.body.amount;
   var eml = req.body.mail;
   var mbl = req.body.mobile;

  var bil1 = new bill({
 customerId:cuidno,
 dId:idno,
   sourcePlace:srce,
   DesinationPlace:dest,
   crType:typ,
   amount:amnt,
   Landmark1:land1,
  Landmark2:land2,
  pickdate:date,
  pickTime:time,
  name:nme,
  mail:eml,
  mobile:mbl

 });


 bil1.save(function(err, docs){
   if ( err ) throw err;
   console.log("cONFIRMATION Saved Successfully");
   res.json(docs);
 });

 })



router.delete('/bil/:id', function(req, res){
  console.log("REACHED Delete FUNCTION ON SERVER");
     bill.remove({_id:req.params.id}, function(err, docs){
       res.json(docs);
   });
})

router.put('/bil/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   bill.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
   });
})

router.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


module.exports = router;
