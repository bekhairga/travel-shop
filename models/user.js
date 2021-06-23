const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');
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
				return next();
			});
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
	bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};
userSchema.methods.generateToken = function (callback) {
	const user = this;
	const token = jwt.sign(user._id.toHexString(), 'secret');
	user.token = token;
	user.save((err, user) => {
		if (err) {
			return callback(err);
		}
		callback(null, user);
	});
};
const User = mongoose.model('User', userSchema);
module.exports = { User };
