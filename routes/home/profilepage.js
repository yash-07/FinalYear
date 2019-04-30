const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
const Friends = require('../../models/Friendlist');
const Friend = require('../../models/Friendship');
const PostFile = require('../../models/File-upload');
const {if_ideq} = require('../../helpers/handlebars-helpers');


router.all('/*',(req,res,next)=>{
		req.app.locals.layout = 'home';
		next();
	});

router.get('/:id', (req,res) => {

	var sess = req.session;
    var userid = req.params.id;

	if(!sess.user) {
		res.redirect('/login');
	}
	else 
	{
		var friendReq = [];
		Friend.findById(sess.user._id).exec((err,docs) => {
			var arrr = [];
			if(docs)
				arrr = docs.relations
			var newArr = [];
			if(arrr.length == 0) {
				console.log(newArr);
					User.aggregate([
						{$match:{_id:{$in:newArr}}}
					],(ee,rr) => {
						console.log("requests");
						console.log(rr);
						friendReq = rr;

						User.findOne({_id: userid }, function(err,user){
							if(err){
								// alert("Error");
								console.log('Error');
								return res.status(500).send();
							}
							else if(!user) {
								// alert("Wrong Credentials");
								console.log("Invalid Username!");
								return res.status(404).send();
							}
							else {
								if(req.query.type == 'json') {
									//return res.status(200).json({message: 'User Found!', user: user});
								}
								else {
									var sessuser = req.session.user;
									var sessid = sessuser._id ;
									//var sessid = "5ca5c231ad24c31ac98ea5fd";
									var if_profilepage = if_ideq(sessid,userid);
				
				
									PostFile.find({postedBy:userid}).sort({_id: -1}).then(posts=>{
				
										var frndLists = [];
										Friends.findById(userid).populate('friends').exec((err, docs) => {
											if(!err && docs)
												frndLists = docs.friends;
											res.render('home/profilepage',{
												postsArray: posts,
												title: user.userName,
												id : sessid,
												userid : userid,
												pic: user.profilePic,
												friendReq: friendReq,
												sesspic: sessuser.profilePic,
												frnds: frndLists,
												firstName : sessuser.firstName,
												sessUserName : sessuser.userName,
												userfirstName : user.firstName
											});
										});
									});
								}
							}
						});

					});
			}
			for(var i in arrr) {
				if(arrr[i].status == 3)
					newArr.push(arrr[i]._id);
				if(i == arrr.length-1) {
					console.log(newArr);
					User.aggregate([
						{$match:{_id:{$in:newArr}}}
					],(ee,rr) => {
						console.log("requests");
						console.log(rr);
						friendReq = rr;

						User.findOne({_id: userid }, function(err,user){
							if(err){
								// alert("Error");
								console.log('Error');
								return res.status(500).send();
							}
							else if(!user) {
								// alert("Wrong Credentials");
								console.log("Invalid Username!");
								return res.status(404).send();
							}
							else {
								if(req.query.type == 'json') {
									//return res.status(200).json({message: 'User Found!', user: user});
								}
								else {
									var sessuser = req.session.user;
									var sessid = sessuser._id ;
									//var sessid = "5ca5c231ad24c31ac98ea5fd";
									var if_profilepage = if_ideq(sessid,userid);
				
				
									PostFile.find({postedBy:userid}).sort({_id: -1}).then(posts=>{
				
										var frndLists = [];
										Friends.findById(userid).populate('friends').exec((err, docs) => {
											if(!err && docs)
												frndLists = docs.friends;
											res.render('home/profilepage',{
												postsArray: posts,
												title: user.userName,
												sessUserName : sessuser.userName,
												id : sessid,
												userid : userid,
												pic: user.profilePic,
												friendReq: friendReq,
												sesspic: sessuser.profilePic,
												frnds: frndLists,
												firstName : sessuser.firstName,
												userfirstName : user.firstName
											});
										});
									});
								}
							}
						});

					});
				}
			}
		});
	}
});

router.post('/',(req,res)=>{
	res.render('home/profilepage');
});

module.exports = router;