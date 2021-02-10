const mongoose = require('mongoose');

const shackSchema = mongoose.Schema({
    userID: String,
    name: String,
    server: String,
    joined: Number,
    balance: Number,
    income: Number,
    tacos: Number,
    work: Number,
    tips: Number,
    daily: Number,
    upgrades: {
        "121": Number,
        "122": Number,
        "123": Number,
        "124": Number,
        "125": Number,
        "126": Number
    },
    employees: {
        "231": Number,
        "232": Number,
        "233": Number,
        "234": Number,
        "235": Number,
        "236": Number,
        "237": Number
    }
},
{ versionKey: false });

module.exports = mongoose.model('shacks', shackSchema);