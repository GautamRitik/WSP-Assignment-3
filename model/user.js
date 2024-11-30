const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
});

userSchema.plugin(passportLocalMongoose); // Add passport-local-mongoose plugin

module.exports = mongoose.model('User', userSchema);
