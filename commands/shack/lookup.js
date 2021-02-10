const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const ms = require("ms");

const incorrect = `❌ Please use the correct format: \`${settings.prefix}lookup [id/shack name]\``;

module.exports.run = async (bot, message, args, funcs) => {
    const embed = new Discord.MessageEmbed()

    if (!args[0]) return message.channel.send(embed.setDescription(incorrect).setColor('dc0000'))
    let user = bot.users.cache.get(args[0])
    if (user) {
        toFind = user.id
        type = 'userID'
    } else {
        toFind = args.join(' ')
        type = 'name'
    }

    shacks.findOne({ [type]: toFind }, (err, data) => {
        if (err) {
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(embed.setDescription('❌ Could not find user!').setColor('dc0000'))
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

            return message.channel.send('This command was not part of v1.0\nThis would not be a command for another **575** days!', { embed: myshack })
        }
    })
}

module.exports.help = {
    name: "lookup",
    aliases: ["search"]
}