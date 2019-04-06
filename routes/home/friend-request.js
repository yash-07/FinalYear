const express = require('express');
const router = express.Router();
const Friend = require('../../models/Friendship');

router.post('/', (req,res) => {

	var srcid = req.body.srcid;
	var destid = req.body.destid;
	var keyValSrc = {"_id" : destid , "status" : 2};
	var keyValDest = {"_id" : srcid , "status" : 3};
	Friend.findOne({_id : srcid} , function(err,frndArray) {
		if(!frndArray) {
			console.log("empty");
			var newFrnd = new Friend({_id: srcid , relations: [keyValSrc]});
			newFrnd.save();
		}
		else {
			console.log("Kuch toh hua hai");
			Friend.findOne({_id: srcid}).exec(function(err,requestt) {
				requestt.relations.push(keyValSrc);
				requestt.save(function(error) {
					console.log("error");
				});
			});
		}
	});
	Friend.findOne({_id : destid} , function(err,frndArray) {
		if(!frndArray) {
			console.log("empty");
			var newFrnd = new Friend({_id: destid , relations: [keyValDest]});
			newFrnd.save();
		}
		else {
			console.log("Kuch toh hua hai");
			Friend.findOne({_id: destid}).exec(function(err,requestt) {
				requestt.relations.push(keyValDest);
				requestt.save(function(error) {
					console.log("error");
				});
			});
		}
	});
	return res.status(200).json({status: 'success'});
});

module.exports = router;