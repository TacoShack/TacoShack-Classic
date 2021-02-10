const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    var help = new Discord.MessageEmbed()
    .setTitle(`All Commands`)
    .setColor('0xf9a422')
    .setThumbnail('https://cdn.dribbble.com/users/72556/screenshots/1711901/8bit-taco.jpg')
    .addField(`help`, `View all commands and their descriptions`)
    .addField(`found/create`, `Found your taco shack`)
    .addField(`shack/myshack`, `View info about your shack`)
    .addField(`upgrades`, `View all upgrades for your taco shack`)
    .addField(`buy [id]`, `Purchase an upgrade`)
    .addField(`hire`, `View all hireable employees`)
    .addField(`hire [id]`, `Hire an employee`)
    .addField(`work`, `Cook some tacos and make some cash`)
    .addField(`tips`, `Check for tips`)
    .addField(`daily`, `Collect your daily gift`)
    .addField(`name/rename`, `Change the name of your taco shack`)
    .setFooter(`Join the Support Server or let @Cole#7575 know if you need assistance!`)

    return message.channel.send({embed:help})
}

module.exports.help = {
    name: "help",
    aliases: ["info"]
}