const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    address: String,
    position: String,
    salary: Number,
    upadate_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema)