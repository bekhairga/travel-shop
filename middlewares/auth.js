const { User } = require('../models/user');

let auth = (req, res, next) => {
	let token = req.cookies.x_auth;

	User.findByToken(token, (err, user) => {});
};
