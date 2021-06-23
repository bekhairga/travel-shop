//bringing all libraries and models to use
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user');
const config = require('./config/key');
//connecting to database
mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch((err) => err);

//using all middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//routes
app.get('/', (req, res) => {
	res.send('hello world');
});

app.post('/api/users/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, userData) => {
		if (err) {
			return res.json({ success: false });
		}
		return res.status(200).json({ success: true });
	});
});

app.post('/api/users/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			return status(400).json({ error: err });
		}
		if (!user) {
			console.log('login');
			return res.json({
				loginSuccess: false,
				message: 'Auth failed, email not found',
			});
		}

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					loginSuccess: false,
					message: 'wrong password',
				});
			}
		});
		user.generateToken((err, user) => {
			if (err) {
				return res.status(400).send(err);
			}
			res.cookie('x_auth', user.token).status(200).json({
				loginSuccess: true,
			});
		});
	});
});

app.get('/api/users/auth');

app.listen('5000', () => {
	console.log('works');
});
