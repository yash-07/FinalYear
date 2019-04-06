const express = require('express');
const router = express.Router();
const Friends = require('../../models/Friendlist');
const Friend = require('../../models/Friendship');
router.post('/', (req,res) => {
    var srcid = req.body.srcid;
    var destid = req.body.destid;

    Friend.findOne({_id:srcid}).exec(function(err,requestt) {
        requestt.relations.pop({_id:destid});
        requestt.save(function(error) {
            console.log("error");
        });
    });

    Friend.findOne({_id:destid}).exec(function(err,requestt) {
        requestt.relations.pop({_id:srcid});
        requestt.save(function(error) {
            console.log("error");
        });
    });

    var keyValSrc = {"_id" : destid};
    var keyValDest = {"_id" : srcid };
    
    Friends.findOne({_id:srcid},function(err,frndArray) {
        if(!frndArray) {
            console.log("empty");
			var newFrnd = new Friends({_id: srcid , friends: [keyValSrc]});
			newFrnd.save();
        }
        else {
            console.log("Kuch toh hua hai");
			Friends.findOne({_id: srcid}).exec(function(err,requestt) {
				requestt.friends.push(keyValSrc);
				requestt.save(function(error) {
					console.log("error");
				});
			});
        }
    });

    Friends.findOne({_id:destid},function(err,frndArray) {
        if(!frndArray) {
            console.log("empty");
			var newFrnd = new Friends({_id: destid , friends: [keyValDest]});
			newFrnd.save();
        }
        else {
            console.log("Kuch toh hua hai");
			Friends.findOne({_id: destid}).exec(function(err,requestt) {
				requestt.friends.push(keyValDest);
				requestt.save(function(error) {
					console.log("error");
				});
			});
        }
    });
    return res.status(200).json({success: 1});
});

module.exports = router;