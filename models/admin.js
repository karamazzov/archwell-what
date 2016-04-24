var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var AdminSchema = new Schema({
  local: {
        email        : String,
        password     : String,
    }
});

AdminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}; //generatin' hash

AdminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}; // checking if password is valid

module.exports = mongoose.model('Admin', AdminSchema);
