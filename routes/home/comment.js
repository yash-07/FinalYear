const express = require('express');
const router = express.Router();
const Posts = require('../../models/File-upload');

router.post('/', (req,res) => {
	var commentText = req.body.commentText;
	var commenterName = req.body.commenterName;
	var commenterUid = req.body.commenterUid;
	var commenterPic = req.body.commenterPic;
	var postId = req.body.postId;

	Posts.findOne({_id:postId}).exec(function(err,reqq) {
		reqq.comments.push({commenterName: commenterName , commenterUid: commenterUid , commenterPic: commenterPic,text: commentText});
		reqq.save(function(error) {
			if(req.query.type == 'api'){
				res.status(200).json({message: 'Comment Posted!'});
			}
			else{
				res.redirect('/');
			}
		});
	});

});

module.exports = router;