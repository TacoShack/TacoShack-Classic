const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("Hiii!")



}

module.exports.help = {
    name: "test",
    aliases: []
}