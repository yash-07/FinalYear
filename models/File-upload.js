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
	},
	comments:[
		{
			cid:{
				type: mongoose.Schema.Types.ObjectId
			},
			commenterName:{
				type: String
			},
			commenterUid: {
				type:String
			},
			commenterPic: {
				type: String
			},
			text: {
				type: String
			}
		}
	]
});

module.exports = mongoose.model('postFile',FileSchema);


