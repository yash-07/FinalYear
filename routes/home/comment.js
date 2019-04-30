const express = require('express');
const router = express.Router();
const Posts = require('../../models/File-upload');
const http = require('http');
const querystring = require('querystring');

router.post('/', (req,res) => {
	var commentText = req.body.commentText;
	var commenterName = req.body.commenterName;
	var commenterUid = req.body.commenterUid;
	var commenterPic = req.body.commenterPic;
	var postId = req.body.postId;


	var data = querystring.stringify({
		'comment': commentText
	});
	
	var options = {
		host: '127.0.0.1',
		port: 2000,
		path: '/abusive',
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(data)
		}
	};

	var httpreq = http.request(options, function (response) {
		response.setEncoding('utf8');
		var resss = ''
		response.on('data', function (chunk) {
			resss = resss + chunk;
		});
		response.on('end', function() {
			Posts.findOne({_id:postId}).exec(function(err,reqq) {
				reqq.comments.push({commenterName: commenterName , commenterUid: commenterUid , commenterPic: commenterPic,text: resss});
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
	});
	httpreq.write(data);
	httpreq.end();

});

module.exports = router;