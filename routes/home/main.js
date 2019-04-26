const express = require('express');
const router = express.Router();
const PostFile = require('../../models/File-upload');
const Users = require('../../models/User');
const Friends = require('../../models/Friendlist');
const http = require('http');
var fs = require('fs');

const Friend = require('../../models/Friendship');
const querystring = require('querystring');

const {isEmpty} = require('../../helpers/upload-helper');
 
 	router.all('/*',(req,res,next)=>{
		req.app.locals.layout = 'home';
		next();
	});

	router.get('/',(req,res)=>{

		if(req.session.user){
		 	var users = req.session.user;
			console.log("User Id: ",users);
			var userid = users._id ;
			
			var friendReq = [];
			var frndLists = [];
			Friend.findById(userid).exec((err,docs) => {
				var arrr = [];
				if(docs)
					arrr = docs.relations;
				var newArr = [];
				if(arrr.length == 0) {
					console.log("Empty arrr");
					Users.aggregate([
						{$match:{_id:{$in:newArr}}}
					],(ee,rr) => {
						console.log("requests");
						console.log(rr);
						friendReq = rr;

						
						Friends.findById(userid).populate('friends').exec((err, docs) => {
							if (!err && docs)
								frndLists = docs.friends;

								Friends.findOne({_id:userid},(err,ell) => {
									if(!err) {
										if(ell) {
											console.log("Badhiya");
											var obje = JSON.parse(JSON.stringify(ell));
											var frnds = obje['friends'];
											console.log("Friends: ",frnds);
											var arra = [];
											for(var i in frnds) {
												arra.push(frnds[i]);
												if(i == frnds.length-1) {
													console.log("arra: ",arra);
													PostFile.aggregate([
														{$match:{postedBy: {$in : arra}}},
														{$sort: {_id: -1}}
													],(ee , rr) => {
														if(!ee) {
															console.log("rr: ",rr);
															var newArr = []
															if(rr.length == 0) {
																console.log("0 length");
																res.render('home/index',{
																	posts:newArr,
																	sesspic:users.profilePic,
																	title:users.userName,
																	friendReq: friendReq,
																	id: users._id,
																	firstName: users.firstName,
																	frnds: frndLists
																});
															}
															rr.forEach(function(element,index,array) {
																console.log(index);
																tagsArray = element['tags'];
																if(tagsArray.length != 0) {
																	Users.aggregate([
																		{$match:{_id:{$in: tagsArray}}}
																	],(eee,rrr)=> {
																		console.log(rrr);
																		element['tags'] = rrr;
																		Users.findOne({_id:element.postedBy},(err,resp) => {
																			element['postedByPic'] = resp.profilePic;
																			element['postedByName'] = resp.firstName;
																			element['postedByUserName'] = resp.userName;
	
																			newArr.push(element);
																			if(index == array.length -1) { 
																				console.log("Badhiya");
																				res.render('home/index',{
																					posts:newArr,
																					friendReq: friendReq,
																					sesspic:users.profilePic,
																					title:users.userName,
																					id: users._id,
																					firstName: users.firstName,
																					frnds: frndLists
																				});
																			}
																		});	
																	});
																}
																else {
																	Users.findOne({_id:element.postedBy},(err,resp) => {
																		element['postedByPic'] = resp.profilePic;
																		element['postedByName'] = resp.firstName;
																		element['postedByUserName'] = resp.userName;

																		newArr.push(element);
																		if(index == array.length -1) { 
																			console.log("Badhiya");
																			res.render('home/index',{
																				posts:newArr,
																				friendReq: friendReq,
																				sesspic:users.profilePic,
																				title:users.userName,
																				id: users._id,
																				firstName: users.firstName,
																				frnds: frndLists
																			});
																		}
																	});
																}
															});
														}
													});
												}
											}
										}
										else {
											console.log("oye chalega");
											res.render('home/index',{
												posts:[],
												sesspic:users.profilePic,
												title:users.userName,
												id: users._id,
												friendReq: friendReq,
												firstName: users.firstName,
												frnds: frndLists
											});
										}
									}
								});

						});
					});
				}
				for(var i in arrr) {
					if(arrr[i].status == 3)
						newArr.push(arrr[i]._id);
					if(i == arrr.length-1) {
						console.log(newArr);
						Users.aggregate([
							{$match:{_id:{$in:newArr}}}
						],(ee,rr) => {
							console.log("requests");
							console.log(rr);
							friendReq = rr;

							
							Friends.findById(userid).populate('friends').exec((err, docs) => {
								if (!err && docs)
									frndLists = docs.friends;

									Friends.findOne({_id:userid},(err,ell) => {
										if(!err) {
											if(ell) {
												console.log("Badhiya");
												var obje = JSON.parse(JSON.stringify(ell));
												var frnds = obje['friends'];
												console.log("Friends: ",frnds);
												var arra = [];
												for(var i in frnds) {
													arra.push(frnds[i]);
													if(i == frnds.length-1) {
														console.log("arra: ",arra);
														PostFile.aggregate([
															{$match:{postedBy: {$in : arra}}},
															{$sort: {_id: -1}}
														],(ee , rr) => {
															if(!ee) {
																console.log("rr: ",rr);
																var newArr = []
																if(rr.length == 0) {
																	console.log("0 length");
																	res.render('home/index',{
																		posts:newArr,
																		sesspic:users.profilePic,
																		title:users.userName,
																		friendReq: friendReq,
																		id: users._id,
																		firstName: users.firstName,
																		frnds: frndLists
																	});
																}
																rr.forEach(function(element,index,array) {
																	console.log(index);
																	Users.findOne({_id:element.postedBy},(err,resp) => {
																		element['postedByPic'] = resp.profilePic;
																		element['postedByName'] = resp.firstName;
																		element['postedByUserName'] = resp.userName;
																		newArr.push(element);
																		if(index == array.length -1) { 
																			console.log("Badhiya");
																			res.render('home/index',{
																				posts:newArr,
																				friendReq: friendReq,
																				sesspic:users.profilePic,
																				title:users.userName,
																				id: users._id,
																				firstName: users.firstName,
																				frnds: frndLists
																			});
																		}
																	});
								
																});
															}
														});
													}
												}
											}
											else {
												console.log("oye chalega");
												res.render('home/index',{
													posts:[],
													sesspic:users.profilePic,
													title:users.userName,
													id: users._id,
													friendReq: friendReq,
													firstName: users.firstName,
													frnds: frndLists
												});
											}
										}
									});

							});
						});
					}
				}
			});
		}

		else{
			res.redirect('/login');
		}

	});

	router.post('/',(req,res)=>{
		
		var users = req.session.user;
		console.log("User Id: ",users);
		var userid = users._id ;//
		let filename = '';

		if(!req.files.file){
			console.log("file nahi hai bete!");
			filename ='';
		}
		
		else {
				let file = req.files.file;
				filename = Date.now() + '-' + file.name;
				let dirUploads = './public/uploads/newfeeds_pic/'; 

				var pp = dirUploads + filename 

				file.mv(dirUploads + filename,(err) =>{
					if(err){ 
						throw err;
					}
				});

				var data = querystring.stringify({
					pic: filename
				});


				var options = {
					host: '127.0.0.1',
					port: 5000,
					path: '/labels',
					method: 'POST',
					headers: {
					  'Content-Type': 'application/x-www-form-urlencoded',
					  'Content-Length': Buffer.byteLength(data)
					}
				};

				hashTags = []

				var httpreq = http.request(options, function (response) {
					response.setEncoding('utf8');
					var ht = '';
					response.on('data', function (chunk) {
						ht = ht + chunk;
					});
					response.on('end', function() {
						var respp = JSON.parse(ht);
						console.log("hashTagString");
						var labelList = respp['labels'];
						var hashTagString = ''
						for(j in labelList) {
							hashTagString = hashTagString + "#" + labelList[j] + " ";
						}
						console.log(hashTagString)
						const pic = new Buffer(fs.readFileSync(pp)).toString("base64");
						var data1 = querystring.stringify({
							'pic': pic
						});
						

						var options1 = {
							host: '127.0.0.1',
							port: 3000,
							path: '/recognize',
							method: 'POST',
							headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': Buffer.byteLength(data1)
							}
						};

						var httpreq1 = http.request(options1, function (response) {
							response.setEncoding('utf8');
							var dt = '';
							response.on('data', function (chunk) {
								dt = dt + chunk;
							});
							response.on('end', function() {
								var resp = JSON.parse(dt);
								var tags = resp['tags']
								var excludedTags = []
								for(j in tags) {
									if(tags[j] != userid) {
										excludedTags.push(tags[j])
									}
									if(j == tags.length-1) {
										console.log("excludedTags")
										console.log(excludedTags);
										const newFile = new PostFile({
											postedBy : userid,
											caption : req.body.caption+"\n"+hashTagString,
											file: filename,
											comments:[],
											tags: excludedTags,
											//hashtags: hashTags
										});
										newFile.save((err,fl) => {
											console.log(fl);
											if(req.query.type == 'api'){
												res.status(200).json({message: 'Post Uploaded!!'});
											}
											else{
												res.redirect('/');
											}
										});
									}
								}
							});
						});
						httpreq1.write(data1);
						httpreq1.end();

					})
				});
				httpreq.write(data);
				httpreq.end();
		}
			
});

module.exports = router;