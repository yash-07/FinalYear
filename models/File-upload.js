const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({

	postedBy:{
		type : String,
		required : true
	},

	caption:{
		type : String
	},
			
	file:{
		type : String
	}
});

module.exports = mongoose.model('postFile',FileSchema);


