var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    var newUser = new User();
    newUser.FirstName = req.body.FirstName;
    newUser.LastName = req.body.LastName;
    newUser.MobileNumber = req.body.MobileNumber;
    newUser.latitude = req.body.latitude;
    newUser.longitude = req.body.longitude;
    newUser.Email = req.body.Email;
    newUser.Did = req.body.Did;
    newUser.UserType = req.body.UserType;
    newUser.Password = newUser.generateHash(req.body.Password);
    newUser.save(function(err) {
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

router.post('/login', function(req, res) {
    User.findOne({
        Email: req.body.Email
    }, function(err, user) {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({
                success: false,
                message: 'Sorry wrong email id'
            });
            console.log('Wrong Email');
        } else if (!user.validPassword(req.body.Password)) {
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Password');
        } else if (user) {
            var token = jwt.sign(user, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: user
            });
            console.log(token);
            console.log('Toke Created');
        }
    });
});
router.put('/update/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   User.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
     console.log(data);
   });
})


router.get('/getuser', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

  User.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

module.exports = router;
