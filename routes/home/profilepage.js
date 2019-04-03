const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
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

 //    var user = sess.user;
    console.log(userid);
	// var userid = user._id;

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
		 			//console.log("User : ",user);
				 	var sessid = sessuser._id ;//sess.user._id;
					var if_profilepage = if_ideq(sessid,userid);
				//console.log(if_profilepage);

				PostFile.find({postedBy:userid}).then(postImage=>{
					//console.log(postImage,"--",userid);
					res.render('home/profilepage',{
							postImage: postImage,
		                    title: user.userName,
		                    if_ideq : if_profilepage,
		                    sessid : sessid,
		                    userid : userid,
		                    firstName : sessuser.firstName,
		                    userfirstName : user.firstName
		                });
				});
		              
		         // return res.render('home/profilepage',{
                //     title: user.userName,
                //     id: user._id,
                //     firstName: user.firstName,
                // });
        
			}
			// return res.status(200).json(user);
		}
	});
});

// router.get('/',(req,res)=>{
// 	res.render('home/profilepage');
// });

router.post('/',(req,res)=>{
	res.render('home/profilepage');
});

module.exports = router;