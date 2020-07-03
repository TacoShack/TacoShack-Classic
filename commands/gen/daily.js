const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)

    if(shacks[message.author.id].daily > Date.now()) {
        return message.channel.send(`You are on a cooldown! Try again in **${ms(shacks[message.author.id].daily - Date.now(), {long:true})}**`)
    }

    shacks[message.author.id].balance = shacks[message.author.id].balance + 250
    shacks[message.author.id].daily = Date.now() + 86400000

    fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
        if(err) console.log(err);
    })

    return message.channel.send(`💰 You have claimed your daily reward of **$250**!`);
}

module.exports.help = {
    name: "daily",
    aliases: []
}