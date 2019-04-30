const express = require('express');
const router = express.Router();
const User = require('../../models/User');
var fs = require('fs');
const http = require('http');
const querystring = require('querystring');

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
	
	//console.log(req.body.optionsCheckboxes);
	let filename = '';
	let file = req.files.file;
	console.log(req.body.dateTimepicker);
	let dirUploads = './public/uploads/profile_pic/'; 

	file.mv(dirUploads + file.name,(err) =>{
		if(err){ 
					throw err;
				}
	});

	//Fetching Data from Form
	const newUser = new User({
		firstName: req.body.firstName ,
		userName: '@'+ req.body.userName ,
		email: req.body.email ,
		password: req.body.password ,
		dateTimepicker: req.body.dateTimepicker ,
		gender: req.body.gender ,
		profilePic: file.name
	});

		

	//Saving Data
	newUser.save((err,user) => {
		if(!err) {
			if(req.query.type == 'api'){
				res.status(200).json({message: 'Signup Successful!'});
			}
			else {

					const pic = new Buffer(fs.readFileSync(dirUploads + file.name)).toString("base64");
					const id = user._id.toString();
					console.log("id: "); 
					console.log(id);

					var data = querystring.stringify({
						'uid': id,
						'pic': pic
					});
					
					var options = {
						host: '127.0.0.1',
						port: 3000,
						path: '/detect',
						method: 'POST',
						headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Content-Length': Buffer.byteLength(data)
						}
					};

					var httpreq = http.request(options, function (response) {
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
						console.log("body: " + chunk);
						});
						response.on('end', function() {
							req.flash('success_message',`Welcome to Soci0_Medi@ ${user.userName} !!`);
							res.redirect('/signup');	
						});
					});
					httpreq.write(data);
					httpreq.end();
			}
		}
		else {
			console.log('Error while saving data');
			console.log(err);
			if(req.query.type == 'api'){
				res.status(200).json({message: 'Error in Signup'});
			}
		}
	});

});

module.exports = router;
