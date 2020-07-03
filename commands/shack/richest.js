const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    var sortable = []
        for(var p in shacks) {
        sortable.push({
                'name':shacks[p].name, 'level':shacks[p].balance
        })
    };

    sortable.sort(function(a, b){return b.level - a.level});

    var top10 = sortable.slice(0, 10); 
    var stringarray = [];
    var i = 0;
    await top10.forEach(c => {
        i++;
        stringarray.push(`**${i}.** **${c.name}** - $${c.level.toString()}`);
    });
    
    var string = stringarray.join("\n\n");

    bot.fetchUser(bot.user).then(myUser => {
        avatar = myUser.avatarURL;
            
    var leader = new Discord.RichEmbed()
    .setColor('#f400f0')
    .setAuthor("💸  Richest Taco Shacks  💸")
    .setDescription(`\n${string}`)

    message.channel.send({embed: leader});
});


}

module.exports.help = {
    name: "richest",
    aliases: []
}