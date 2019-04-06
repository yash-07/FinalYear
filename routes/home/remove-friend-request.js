const express = require('express');
const router = express.Router();
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
    return res.status(200).json({success: 1});
});

module.exports = router;