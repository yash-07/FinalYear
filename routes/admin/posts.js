const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.all('/*',(req,res,next)=>{
	req.app.locals.layout = 'admin';
	next();
});

router.get('/', (req,res) => {

	var sess =req.session;
	if(sess.user){
		
		res.redirect('/');
	}
	else{
		//res.render('admin/signup',{title : 'Signup'});
		//console.log(sess);
		User.find({}).then(posts =>{
				res.render('admin/signup');	
			});
	}
});

router.get('/admin',(req,res)=>{
	
	User.find({}).then(posts=>{

		res.render('admin/posts-index',{posts: posts});
	});

});


router.post('/',(req,res)=>{
	
	let optionsCheckboxes = true;
		if(req.body.optionsCheckboxes){
			optionsCheckboxes = true;
		} 
		else{
			optionsCheckboxes = false;
		}

	let filename = '';
	let file = req.files.file;

	//Fetching Data from Form
	const newUser = new User({

		firstName: req.body.firstName ,
		userName: '@'+ req.body.userName ,
		email: req.body.email ,
		password: req.body.password ,
		dateTimepicker: req.body.dateTimepicker ,
		gender: req.body.gender ,
		//file: filename,
		optionsCheckboxes: optionsCheckboxes,	
		//date : generateTime date 'DD MMMM YYYY X'
	});

		//Moving File To Folder
		var currentid = newUser._id;
		//console.log(currentid);
	
		filename = currentid + '-' + file.name;
		let dirUploads = './public/uploads/profile_pic/'; 

		file.mv(dirUploads + filename,(err) =>{
			if(err){ 
						throw err;
					}
		});

	//Saving Data
	newUser.save((err,post) => {
		if(!err) {
			console.log('doc:'+post);
			
			req.flash('success_message',`Welcome to Soci0_Medi@ ${post.userName} !!`);
			res.redirect('/signup');
		}
		else {
			console.log('Error while saving data');
			console.log(err);
		}
	});

	//.then(Savedpost =>{
	//	res.redirect('/signup');
	//	console.log(Savedpost);
	//})

});

module.exports = router;
