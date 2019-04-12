const express = require('express');
const router = express.Router();
const PostFile = require('../../models/File-upload');
const Users = require('../../models/User');
const Friends = require('../../models/Friendlist');


router.post('/', (req,res) => {
    var cid = req.body.cid;

    Friends.findOne({_id:cid},(err,ell) => {
        if(err) {
            return res.status(404).json({result: err});
        }
        else {
            var obje = JSON.parse(JSON.stringify(ell));
            var frnds = obje['friends'];
            var arra = [];
            for(var i in frnds) {
                arra.push(frnds[i]._id);
            }
            PostFile.aggregate([
                {$match:{postedBy: {$in : arra}}},
                {$sort: {_id: -1}}
            ],(ee , rr) => {
                if(!ee) {
                    // console.log(rr);
                    var newArr = []
                    rr.forEach(function(element,index,array) {
                        Users.findOne({_id:element.postedBy},(err,resp) => {
                            element['postedByPic'] = resp.profilePic;
                            element['postedByName'] = resp.firstName;
                            element['postedByUserName'] = resp.userName;
                            newArr.push(element);
                            if(index === array.length -1) {
                                return res.status(200).json({posts: newArr});
                            }
                        });

                    });
                }
                else {
                    return res.status(404).json({result: err});
                }
            });
        }
    });
});

module.exports = router;