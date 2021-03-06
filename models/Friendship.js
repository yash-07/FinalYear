const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FriendshipSchema = new Schema({
	_id : {
		type : String,
		required : true
	},
	relations: [{
		_id: {
			type : mongoose.Schema.Types.ObjectId,
        	ref: 'users',
			required : true
		},
		status: {
			type : Number,
			required : true
		}
	}]

});

module.exports = mongoose.model('Friendship', FriendshipSchema);