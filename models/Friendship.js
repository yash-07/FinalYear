const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('User');

var FriendListSchema =new Schema({
	friends: [{
        friendName: {
            type: Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        duration: {
            type: Number
        }
    }]
});

   // Friendship Schema
var FriendshipSchema = new Schema({
	mainId : {
		type : String,
		required : true
	},
	relations: [{
		id: {
			type : String,
			required : true
		},
		status: {
			type : Number,
			required : true
		}
	}]
// requester: {
//     type: int,
//     required: true
// },
// recipient: {
//     type: int,
//     required: true
// },
// status:{
//     type: int,
//     required: true
//     } 
});

module.exports = mongoose.model('Friendship', FriendshipSchema);
module.exports = mongoose.model('FriendList', FriendListSchema);
