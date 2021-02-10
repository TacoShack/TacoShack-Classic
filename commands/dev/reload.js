const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const prefix = settings.prefix;
const shacks = require("../../schemas/shacks.js");
const fs = require('fs');
const path = require('path');

module.exports.run = async (bot, message, args) => {

    const commandName = args[0].toLowerCase();
		const command = bot.commands.get(commandName)
            || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

		if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`!`);

		const commandFile = traverse(path.join(__dirname, '../../commands'), commandName);
		if(!commandFile) return message.channel.send('File not found');
		delete require.cache[require.resolve(commandFile)];

		try {
			const newCommand = require(commandFile);
			bot.commands.set(newCommand.help.name, newCommand);
			message.channel.send(`Command \`${command.help.name}\` was reloaded!`);
		}
		catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}

    
    
}

function traverse(dir, filename) {
	for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
		const direntPath = path.join(dir, dirent.name);
		if (dirent.isDirectory()) {
			const result = traverse(direntPath, filename);
			if(result) return result;
		}
		else if(dirent.name === filename + '.js') {return direntPath;}
	}
	return null;
}

module.exports.help = {
    name: "reload",
    dev: true,
    aliases: []
}