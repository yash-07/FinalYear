const express = require('express');
const router = express.Router();
const PostFile = require('../../models/File-upload');
const PostComment = require('../../models/Comment-upload');
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
			
			PostFile.find({postedBy:userid}).then(postArray=>{
				res.render('home/index',{
					posts:postArray,
					sesspic: users.profilePic,
					title: users.userName,
					id: users._id,
					firstName : users.firstName
				});
			});
		}

		else{
			res.redirect('/login');
		}
		//PostComment.find({}).then(postComment=>{
			//console.log(postedid);
			//res.render('home/index',{postComment: postComment});
		//});

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