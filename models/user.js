const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
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

userSchema.pre('save', function (next) {
	var user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(saltRound, (err, salt) => {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) {
					return next(err);
				}
				user.password = hash;
			});
		});
	} else {
		return next();
	}
});
const User = mongoose.model('User', userSchema);
module.exports = { User };
