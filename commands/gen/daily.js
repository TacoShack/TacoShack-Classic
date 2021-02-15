const shacks = require('../../schemas/shacks.js');
const ms = require("ms")

module.exports.run = async (bot, message, args, funcs, prefix) => {
    shacks.findOne({ userID: message.author.id }, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`${prefix}found\` to found your shop!`)
            return;
        } else if (data) {
            if (data.daily > Date.now()) {
                message.channel.send(`You are on a cooldown! Try again in **${ms(data.daily - Date.now(), { long: true })}**`)
                return;
            }
            data.balance += 250
            data.daily = Date.now() + 86400000
            data.save().catch(err => console.log(err))
            return message.channel.send(`💰 You have claimed your daily reward of **$250**!`);
        }
    })
}

module.exports.help = {
    name: "daily",
    aliases: []
}