const express = require('express');
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://klaun:7408449da7@cluster.g6zcw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch((err) => err);
const app = express();

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen('5000', () => {
	console.log('works');
});
