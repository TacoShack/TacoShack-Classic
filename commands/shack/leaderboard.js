const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");

module.exports.run = async (bot, message, args) => {

    shacks.find().sort([
        ['tacos', 'descending']
    ]).exec(async (err, res) => {
        if (err) return console.log(err);

        var leader = new Discord.MessageEmbed()
            .setColor('#f400f0')
            .setAuthor("🌮  Most Tacos Sold  🌮")

        stringarray = []
        if (res.length === 0) {
            // ... 
        } else if (res.length < 10) { // Less than 10 results
            for (i = 0; i < res.length; i++) {
                stringarray.push(`**${i + 1}.** **${res[i].name}** - ${res[i].tacos.toString()} Tacos`)
            }
        } else {
            for (i = 0; i < 10; i++) {
                stringarray.push(`**${i + 1}.** **${res[i].name}** - ${res[i].tacos.toString()} Tacos`)
            }
        }
        var string = stringarray.join("\n\n");

        let obj = res.find(u => u.userID === message.author.id);
        let index = res.indexOf(obj);
        leader.setDescription(`\n${string} ${(index < 10) ? "" : `\n━━━━━━━━━━━━━━\n**${index + 1}.** **You** - ${obj.tacos.toString()} Tacos`}`)
        if (index > 10) {
            leader.setFooter('The leaderboard in v1.0 would not show your place')
        }
        await message.channel.send({ embed: leader });
    })

}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb", "top"]
}