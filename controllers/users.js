var express = require('express');
var router = express.Router();
var oauth = require('../middleware/oauth');
var User = require('../models/user');

router.get('/me', oauth, function(request, response, next) {
	response.setHeader('Content-Type', 'application/json');
	response.send(JSON.stringify(request.user));
});

router.post('/', function(request, response, next) {
	response.setHeader('Content-Type', 'application/json');

	if (request.body.username && request.body.password) {
		User.create({
			username: request.body.username,
			password: request.body.password
		}).then((res) => {
			if (res) {
				response.send(JSON.stringify(res));
			}
		});
	}
	else {
		response.send({ error: 'Invalid parameters.' });
	}
});

module.exports = router;
