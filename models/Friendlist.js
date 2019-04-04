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

module.exports = mongoose.model('FriendList', FriendListSchema);
