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
		//req.session.destroy();
		res.redirect('/login');
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
		if(err){ return console.log(err);}
		if(!user){ return console.log(userName); }

		if (user.compare(req.body.password)){
			//var sess = req.session;
			//sess.id = user._id;
			//sess.fullName = user.fullname;
			// sess.username = user.username;
			// sess.email = user.email;
			req.session.user = user;
			req.session.save();
			var id = user._id;
			//console.log(req.session.user);
			res.redirect('/');
		}
	});
});

module.exports = router;