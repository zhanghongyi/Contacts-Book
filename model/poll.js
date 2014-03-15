var mongoose = require('mongoose');

exports.PollSchema = new mongoose.Schema({
	firstname: { type: String, required: true},
	lastname: { type: String, required: true},
	email: String,
	phone: String,
	notes: String
});