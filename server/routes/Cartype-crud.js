 var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

var CarSchema = mongoose.Schema({

     CrTp:String,
     Amount:String,
     Free:String,
      till:String,
      peakhr1:String,
      peakhr2:String,
      peakrate:String,
     after:String


    });

var Car = mongoose.model('Car', CarSchema, 'CarTable');




router.get('/crtype', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Car.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/crtype/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Car.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/crtype', function(req, res){
  console.log(req.body);

    var type = req.body.CrTp;
    var amnt = req.body.Amount;
    var off = req.body.Free;
    var before = req.body.till;
    var aftr = req.body.after;
    var pk1 = req.body.peakhr1;
   var pk2 = req.body.peakhr2;
    var pkrate = req.body.peakrate;




   var Type1 = new Car({

    CrTp:type,
    Amount:amnt,
    Free:off,
      till:before,
      peakhr1:pk1,
      peakhr2:pk2,
      peakrate:pkrate,
        after:aftr

  });


  Type1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/crtype/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Car.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/crtype/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Car.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
