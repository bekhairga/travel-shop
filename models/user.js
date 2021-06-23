const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxLength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: 1,
	},
	password: {
		type: String,
		minLength: 5,
	},
	lastName: {
		type: String,
		maxLength: 50,
	},
	role: {
		type: Number,
		default: 0,
	},
	token: {
		type: String,
	},
	tokeExpire: {
		type: Number,
	},
});
const User = mongoose.model('User', userSchema);
module.exports = { User };
