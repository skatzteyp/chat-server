const AccessToken = require('../models/access_token'),
	User = require('../models/user'),
	Message = require('../models/message'),
	Q = require('q');

class SocketController {
	constructor(io, socket) {
		this.io = io;
		this.socket = socket;

		this.validateToken().then((res) => {
			if (res) {
				this.user = res;
				this.socket.on('message', (message) =>  { this.messageReceived(message); });
				this.socket.on('get messages', () => { this.getMessages(); });

			}
		});
	}

	validateToken() {
		return Q.promise((resolve, reject) => {
			if (this.socket.handshake.query.token) {
				AccessToken.findOne(this.socket.handshake.query.token).then((res) => {
					if (res) {
						User.findOne({ _id: res.userId }).then((res) => {
							resolve(res);
						});
					} else {
						reject();
					}
				});
			}
		});
	}

	messageReceived(message) {
		Message.create({
			user: this.user,
			body: message
		}).then((res) => {
			res.user = this.user;
			this.io.emit('message', res);
		});
	}

	getMessages() {
		Message.find().then((res) => {
			let messages = res;
			let promises = [];

			for(let i=0;i < messages.length;i++) {
				promises.push(User.findOne({ _id : messages[i].userId }));
			}

			Q.all(promises).then((res) => {
				for(let i=0;i<messages.length;i++) {
					messages[i].user = res[i];
				}

				this.socket.emit('message', messages);
			});
		});
	}
}

module.exports = SocketController;
