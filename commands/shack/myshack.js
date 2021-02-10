const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, funcs) => {
    shacks.findOne({ userID: message.author.id }, (err, data) => {
        if (args[0] === 'stats') {
            message.channel.send(funcs.embed("03/29/2020"))
            return;
        } else {
            if (err) {
                message.channel.send('An error occured.')
                return;
            } else if (!data) {
                message.channel.send(`You do not own a shack! Use \`${settings.prefix}found\` to found your taco shack!`)
                return
            } else if (data) {
                var time = ms(Date.now() - data.joined, { long: true });

                var myshack = new Discord.MessageEmbed()
                    .setTitle(`${data.name}`)
                    .setColor('0xf9a422')
                    .setThumbnail(message.author.displayAvatarURL())
                    .addField(`Name`, `🔺 ${data.name}`)
                    .addField(`Balance`, `💵 $${data.balance}`)
                    .addField(`Income`, `💸 $${data.income}/hour`)
                    .addField(`Total Tacos`, `🌮 ${data.tacos}`)
                    .addField(`Shack Age`, `⏳ ${time}`)

                return message.channel.send({ embed: myshack })
            }
        }
    })
}

module.exports.help = {
    name: "myshack",
    aliases: ["shack", "profile", "account", "balance", "bal", "b"]
}