const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

	firstName:{

	type: String,
	trim: true,
	required:true
				},

	userName:{

	type: String,
	trim: true,
	required:true,
	unique : true
			},

	email:{

		type:String,
		unique: true,
		trim: true,
		minlength: 8,
		required:true,
		unique: true
	},

	password:{

		type:String,
		required:true,
		minlength:8
		},

	dateTimepicker:{

		type:String,
		required: true
	},

	profilePic:{
		type: String,
		required: true
	}

});

UserSchema.methods.compare = function(pw){
	if(pw == this.password){
		return true;
	}
}

module.exports = mongoose.model('users',UserSchema);
