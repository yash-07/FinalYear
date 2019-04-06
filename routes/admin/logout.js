const express = require('express');
const router = express.Router();
router.all('/*',(req,res,next)=>{

req.app.locals.layout = 'admin';
next();

});

router.get('/', (req,res) => {
	var sess= req.session;
	sess.destroy();
	res.redirect('/login');
});

module.exports = router;