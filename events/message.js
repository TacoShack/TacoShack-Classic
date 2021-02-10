const Discord = require('discord.js');
const settings = require(`../util/settings.json`)
const funcs = require('../util/functions.js')
const cooldown = new Set();
module.exports = async (bot, message) => {

        if(!message.guild || !message.content.startsWith(settings.prefix) || message.author.bot) return;
        
        const args = message.content.substring(settings.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
		const command = bot.commands.get(commandName)
			|| bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));


		if (!message.channel.permissionsFor(message.guild.me.id).has('SEND_MESSAGES')) {
			return;
		}
	
        if (!command) return message.reply("Please enter a valid command!")
        
        // Developer commands
		if (command.help.dev) {
			if (!settings.devs.includes(message.author.id)) return
		}
		
		if(cooldown.has(message.author.id)) {
			message.channel.send({embed: {color: "dc0000", description: "❌ Please slow down!", footer: {"text": "Command cooldowns were not part of v1.0"}}})
			return
		} else{
			cooldown.add(message.author.id)
			setTimeout(() => {cooldown.delete(message.author.id)}, 700);
		}		

		try {
			command.run(bot, message, args, funcs);
		}
		catch(err) {
			console.log(err);
			message.reply('There was an error trying to execute that command!');
        }
};
