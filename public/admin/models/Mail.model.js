
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MailSchema = new Schema({
	name: String,
	email: String,
	content: String
})

module.exports = mongoose.model('Mail', MailSchema);