const settings = require('./util/settings.json')
const shacks = require("./schemas/shacks.js");
const Discord = require('discord.js');
module.exports = {
    send: (bot) => {
        out = []
       
        shacks.find()
        .then(async (results) => {
            var d = new Date().toLocaleTimeString();
            bot.logWebhook.send(`⏱ [\`${d}\`] Hourly Income Starting! (${results.length} Shacks)`);
            results.forEach(async (result, i = 0) => {
                shacks.findOne({userID: result.userID}, async (err, data) => {
                    if (err) {
                        console.log(err)
                        return bot.logWebhook.send(`⚠ An error occured, check logs!`);
                    }
                    if (!data) {
                        return bot.logWebhook.send(`⚠ Lack of data!`);
                    }
                    var tacorando = Math.floor(Math.random() * (20 - 5) ) + 5;
                    var tacos = Math.floor((Math.round(data.income / 4)) + tacorando);
                    data.balance = data.balance + data.income;
                    data.tacos = data.tacos + tacos;
                    data.save().catch(err => console.log(err))
                    i++;
                    if (i === results.length){
                        var d1 = new Date().toLocaleTimeString();
                        return bot.logWebhook.send(`✅ [\`${d1}\`] Hourly Income Done!`);
                    }
                })
            })
        });

      
    }
}