const MongoClient = require('mongodb').MongoClient,
	Q = require('q');

class MongoDb {
	static connect() {
		let url = 'mongodb://localhost:27017/chat';

		return Q.Promise((resolve, reject) => {
			MongoClient.connect(url, function(err, db) {
				if (err) {
					reject(err);
				}
				else {
					resolve(db);
				}
			});
		});
	}
}

module.exports = MongoDb;
