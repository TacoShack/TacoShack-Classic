const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, funcs) => {

    message.channel.send(funcs.embed("01/11/2021"))
    
}

module.exports.help = {
    name: "grindstreak",
    aliases: ['gs']
}