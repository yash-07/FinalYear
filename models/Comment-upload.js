const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

	commentText:{ 
		type: String, 
		required: true 
	},

	postedBy:{
		 type: String, 
		 required: true 
	},

	postedTo:{ 
		type: String, 
		required: true 
	},

	datePosted:{ 
		type:Date, 
		date:new Date()
	}

});

module.exports = mongoose.model('postComment',CommentSchema);
