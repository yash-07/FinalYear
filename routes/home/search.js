const express = require('express');
var router = express.Router();
const User = require('../../models/User');

router.post('/', (req,res) => {
    User.find({firstName:{'$regex':req.body.search}}, function(err,user){
        if(user){
            console.log("Users Are:");
            console.log(user);
            return res.status(200).json({user: user});
        }
        else {
            console.log("null");
            return res.status(200).json({});
        }
    });
});

module.exports = router;