const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("🌮 Ready to sell some tacos!");
}

module.exports.help = {
    name: "status",
    aliases: ["s"]
}