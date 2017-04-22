var express = require('express');
var router = express.Router();
var Driver = require('../models/Driver.js');
var jwt = require('jsonwebtoken');




router.get('/drive', function (req, res,next) {
   console.log("REACHED GET FUNCTION ON SERVER");

   Driver.find({}, function (err, docs) {
        res.json(docs);
        console.log(docs);

   });
});

router.get('/drive/:id', function (req, res) {
   console.log("REACHED GET ID FUNCTION ON SERVER");
    Driver.find({_id: req.params.id}, function (err, docs) {
        res.json(docs);

   });
});


router.post('/drive', function(req, res) {
    var newDriver = new Driver();
    newDriver.Email = req.body.Email;
    newDriver.Did = req.body.Did;
    newDriver.FirstName = req.body.FirstName;
    newDriver.age = req.body.age;
    newDriver.Car = req.body.Car;
    newDriver.carNo = req.body.carNo;
    newDriver.Mobile = req.body.Mobile;

    newDriver.licence = req.body.licence;
    newDriver.drtype = req.body.drtype;


    // newDriver.Email = req.body.Email;
    newDriver.Password = newDriver.generateHash(req.body.Password);
    newDriver.save(function(err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true
            });
            console.log('Signup API Called');
        }
    });
});




router.delete('/drive/:id', function(req, res){
  console.log("REACHED Delete FUNCTION ON SERVER");
     Driver.remove({_id:req.params.id}, function(err, docs){
       res.json(docs);
   });
})

router.put('/drive/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   Driver.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
   });
})


router.post('/loginDriver', function(req, res) {
  console.log(req);
    Driver.findOne({
        Email: req.body.Email
    }, function(err, driver) {
        if (err) {
            res.json(err);
        } else if (!driver) {
            res.json({
                success: false,
                message: 'Sorry wrong email id'
            });
            console.log('Wrong Driver Email');
        } else if (!driver.validPassword(req.body.Password)) {
          console.log(res);
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Driver Password');
        } else if (driver) {
            var token = jwt.sign(driver, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: driver
            });
            console.log(token);
            console.log('Toke Created');
        }
    });
});
router.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});

module.exports = router;
