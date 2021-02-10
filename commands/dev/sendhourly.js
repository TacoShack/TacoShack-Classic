const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require('fs');
const path = require('path');
const hourlyIncome = require('../../hourlyIncome.js')
module.exports.run = async (bot, message, args) => {

    var d = new Date().toLocaleTimeString();
    bot.logWebhook.send(`ℹ [\`${d}\`] **${message.member.user.tag}** manually sent hourly income!`);
	hourlyIncome.send(bot)
	message.channel.send('Hourly Income Started.')
}



module.exports.help = {
    name: "sendhourly",
    dev: true,
    aliases: []
}