const Model = require('./model');


class Message extends Model {
	static get collection() {
		return 'messages';
	}

	static create(data) {
		let message = {
			userId: data.user._id,
			body: data.body,
			time: new Date()
		}

		return this._create(message);
	}
}

module.exports = Message;
