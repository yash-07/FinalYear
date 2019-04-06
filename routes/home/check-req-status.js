const express = require('express');
const router = express.Router();
const Friend = require('../../models/Friendship');
const Friends = require('../../models/Friendlist');

router.post('/', (req,res) => {
    console.log("Api Call");
	var srcid = req.body.srcid;
    var destid = req.body.destid;
    if(srcid == destid) {
        console.log("apna hi page hai...");
        return res.status(200).json({status: -1});
    }
    var found = false;
    Friends.find({_id:srcid},(err,ar) => {
        if(ar.length != 0) {
            ar.forEach(element => {
                var rell = JSON.parse(JSON.stringify(element));
                var friends = rell['friends'];
                for(var i in friends) {
                    if(friends[i]._id == destid) {
                        console.log("Friends Hi toh hai!!");
                        found = true;
                        return res.status(200).json({status: 1});
                    }
                }
            });
        }
    });

    if(found == false) {

        Friend.find({_id:srcid},(err,ar)=>{
            if(ar.length == 0) {
                return res.status(200).json({status: 0});
            }
            else {
                ar.forEach(element => {
                    var rell = JSON.parse(JSON.stringify(element));
                    var relations = rell['relations'];
                    for(var i in relations) {
                        if(relations[i]._id == destid) {
                            found = true;
                            return res.status(200).json({status: relations[i].status});
                        }
                    }
                    if(found === false) 
                        return res.status(200).json({status: 0});
                });
            }
        });
    }
});

module.exports = router;