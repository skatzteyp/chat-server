var express = require('express');
var router = express.Router();
var oauth = require('../middleware/oauth');
var Message = require('../models/message');

router.get('/', function(request, response, next) {
	Message.find().then((res) => {
		response.setHeader('Content-Type', 'application/json');
		response.send(JSON.stringify(res));
	});
});

router.post('/', function(request, response, next) {
	Message.create({
		user: request.user,
		body: request.body.body
	}).then((res) => {
		response.setHeader('Content-Type', 'application/json');
		response.send(JSON.stringify(res));
	});
});

module.exports = router;
