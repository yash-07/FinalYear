const express = require('express');
const router = express.Router();
const User = require('../../models/User');
router.all('/*',(req,res,next)=>{

req.app.locals.layout = 'admin';
next();

});

//var authenticated = (req,res,next) =>{
//	 var sess = req.session;
//	if(sess && sess.user) return next();
//	return res.redirect('/login');
//}

router.get('/', (req,res) => {
	var sess= req.session;
	if(sess.user)
	{
		res.redirect('/');
	}
	else{
		res.render('admin/login',{title : 'Login'});
	}
});

//router.get('/',authenticated, (req,res)=>{
//	res.send(req.session.user);
//	console.log(req.session.user);
//});

router.post('/',(req,res)=>{
	var userName = req.body.userName; 
	var password = req.body.password;
	var sess = req.session;
	User.findOne({userName: userName, password: password},(err,user)=>{
		if(err){
			if(req.query.type == 'api') {
				return res.status(200).json({message: 'Login Error!'});
			}
			else {
				return console.log(err);
			} 
		}
		if(!user){
			if(req.query.type == 'api') {
				return res.status(404).json({message: 'Invalid Credentials!'});
			}
			else {
				return console.log(userName); 
			}
		}

		if (user.compare(req.body.password)){
			if(req.query.type == 'api') {
				var nn = JSON.parse(JSON.stringify(user));
				console.log(nn);
				return res.status(200).json({message: 'Login Successful!', user: nn});
			}
			else {
				req.session.user = user;
				req.session.save();
				var id = user._id;
				res.redirect('/');
			}
		}
	});
});

module.exports = router;