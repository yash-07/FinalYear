const express = require('express');
const router = express.Router();
const PostFile = require('../../models/File-upload');
const Users = require('../../models/User');
const Friends = require('../../models/Friendlist');
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
			
			Friends.findOne({_id:userid},(err,ell) => {
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
									res.render('home/index',{
										posts:newArr,
										sesspic:users.profilePic,
										title:users.userName,
										id: users._id,
										firstName: users.firstName
									});
								}
							});

						});
					}
				});
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

					file.mv(dirUploads + filename,(err) =>{
						if(err){ 
							throw err;
						}
					});
		}	
					
			const newFile = new PostFile({
					postedBy : userid,
					caption : req.body.caption,
					file: filename,
					comments:[]
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

			
});

module.exports = router;