const mongoose = require('mongoose')
const settings = require('./util/settings.json')
module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        mongoose.connect(settings.mongoPass, dbOptions);

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection successfully opened!');
        });

        mongoose.connection.on('err', err => {
            console.log('Mongoose connection error: \n'+err.stack)
        });

        mongoose.connection.on('disconnected', (err) => {
            console.log('Mongoose connection disconnected')
        });
    }
}
