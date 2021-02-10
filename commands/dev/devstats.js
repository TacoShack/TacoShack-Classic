const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require('fs');
const path = require('path');
const os = require('os')
module.exports.run = async (bot, message, args) => {

    const { commands } = message.client;

			
    //Get uptime and ram usage for bot
    let uptime = convertMs(message.client.uptime);
    let ramUsage = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
    let ramTotal = (os.totalmem() / 1024 / 1024).toFixed(2);
    let percentage = ((ramUsage / ramTotal) * 100).toFixed(2) + '%';
    //Create an embed for the information
    let statsEmbed = new Discord.MessageEmbed()
    .setColor('4A90E2')
    .setAuthor(`${bot.user.username} stats`, bot.user.displayAvatarURL())
    .addField('📈 Bot', `${bot.guilds.cache.size} Servers\n${bot.users.cache.size} Members\n`)
    .addField('👤 Creator', `Original: Cole#7575\nUpdated by: Albert#0002`)
    .addField('⬆ Uptime', `${uptime}`)
    .addField(`💻 Hosting Information`, `Ram: ${ramUsage}MB / ${ramTotal}MB (${percentage})\nKernel: ${os.type()} ${os.release()}`)
    .addField(`🚚 API Latency`, `${bot.ws.ping}ms`)
    .addField(`👆 Commands`, `${commands.size}`)
    .addField(`🛠 Built using`, `Node.js: V${process.versions.node}\nDiscord.js: V${Discord.version}`)
    //Send the embed
    return message.channel.send(statsEmbed)
    //Convert ms into time
    function convertMs(mills){
    let roundNumber = mills > 0 ? Math.floor : Math.ceil;
    let days = roundNumber(mills / 86400000),
    hours = roundNumber(mills / 3600000) % 24,
    mins = roundNumber(mills / 60000) % 60,
    secs = roundNumber(mills / 1000) % 60;
    var time = (days > 0) ? `${days} Days, ` : "";
    time += (hours > 0) ? `${hours} Hours, ` : "";
    time += (mins > 0) ? `${mins} Minutes, ` : "";
    time += (secs > 0) ? `${secs} Seconds` : "0 Seconds";
    return time;
    }			
    
    
}

module.exports.help = {
    name: "devstats",
    dev: true,
    aliases: []
}