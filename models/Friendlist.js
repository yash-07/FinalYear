const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('User');

var FriendListSchema =new Schema({
    _id : {
		type : String,
		required : true
	},
    friends: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true
    }]
});

module.exports = mongoose.model('FriendList', FriendListSchema);