const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)

    var arlen = args[0].length + 2;
    var params = message.content.slice(arlen);

    if(!args[1]) return message.reply(`Please use the correct format! \`!name [new name]\``);
    if(params.length < 3) return message.reply(`Please use more than \`3\` characters!`);
    if(params.length > 30) return message.reply(`Please use less than \`30\` characters!`);
    if(!isNaN(params)) return message.reply(`Please use letters!`);

    shacks[message.author.id].name = params

    fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
        if(err) console.log(err);
    })

    return message.channel.send(`✅ Changed name to: **${shacks[message.author.id].name}**`)

}

module.exports.help = {
    name: "name",
    aliases: ["rename"]
}