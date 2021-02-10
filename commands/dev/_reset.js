const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require('fs');
const path = require('path');
module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has("BAN_MEMBERS")) return;
    var incorrect = `Please use the correct format: \`${settings.prefix}_reset [name] [User ID]\`\nEx: \`${settings.prefix}reset name 255422791875166208\``
    if (!args[0] || !args[1]) return message.channel.send(incorrect)
    if (args[0].toLowerCase() != 'name') return message.channel.send(incorrect)
    const userid = args[1].replace(/[<@!>]/g, '')

    shacks.findOne({userID: userid}, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`Shack not found!`)
            return;
        } else if (data){
            data.name = "Taco Shack"
            data.save().catch(err => console.log(err))
            return message.channel.send(`✅ Changed \`${data.userID}\` name to: **${data.name}**`)
        }
    })
}



module.exports.help = {
    name: "_reset",
    aliases: []
}