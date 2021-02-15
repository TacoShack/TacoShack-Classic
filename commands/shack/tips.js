const shacks = require("../../schemas/shacks.js");

module.exports.run = async (bot, message, args, funcs, prefix) => {

    shacks.findOne({ userID: message.author.id }, async (err, data) => {
        if (err) {
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`${prefix}found\` to found your shop!`)
            return
        } else if (data) {

            if (data.tips > Date.now() && data.tips) {
                message.channel.send(`Chill... Money doesn't grow on trees!`)
                return;
            }

            var tip = Math.floor(Math.random() * (50 - 10)) + 10;
            data.tips = Date.now() + 300000
            data.balance += tip
            data.save().catch(err => console.log(err))

            return message.channel.send(`💵 You collected **$${tip}** in tips!`)
        }
    })
}

module.exports.help = {
    name: "tips",
    aliases: ["tip"]
}