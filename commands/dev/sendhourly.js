const hourlyIncome = require('../../hourlyIncome.js');

module.exports.run = async (bot, message) => {
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