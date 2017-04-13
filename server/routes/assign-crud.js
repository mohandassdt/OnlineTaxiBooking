var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

var assignSchema = mongoose.Schema({

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

var assignDriver = mongoose.model('assignDriver', assignSchema, 'assignTable');




router.get('/asgn', function (req, res,next) {
   console.log("REACHED GET FUNCTION ON SERVER");

   assignDriver.find({}, function (err, docs) {
        res.json(docs);
        console.log(docs);

   });
});

router.get('/asgn/:id', function (req, res) {
   console.log("REACHED GET ID FUNCTION ON SERVER");
    assignDriver.find({_id: req.params.id}, function (err, docs) {
        res.json(docs);

   });
});

router.post('/asgn', function(req, res){
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

  var assn1 = new assignDriver({
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


 assn1.save(function(err, docs){
   if ( err ) throw err;
   console.log("cONFIRMATION Saved Successfully");
   res.json(docs);
 });

 })



router.delete('/asgn/:id', function(req, res){
  console.log("REACHED Delete FUNCTION ON SERVER");
     assignDriver.remove({_id:req.params.id}, function(err, docs){
       res.json(docs);
   });
})

router.put('/asgn/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   assignDriver.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
   });
})

router.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


module.exports = router;
