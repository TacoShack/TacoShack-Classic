const Discord = require('discord.js');
const bot = new Discord.Client();

// Package Imports
const path = require('path');
const requireAll = require('require-all');
const fs = require('fs');
const cron = require('cron');

// File Imports
const mongoose = require('./mongoose.js');
const settings = require('./util/settings.json');
const hourlyIncome = require('./hourlyIncome.js');

// Bot Properties
bot.logWebhook = new Discord.WebhookClient(settings.logWebhook[0], settings.logWebhook[1]);
bot.commands = new Discord.Collection();

// Send hourly incomes every hour
let hourlyIncomeJob = new cron.CronJob('0 * * * *', () => {
	hourlyIncome.send(bot);
})

// On Ready Event
bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag} | Taco Shack Ready to Sell Some Tacos!`)
	bot.user.setActivity(`with v1.0`)
	hourlyIncomeJob.start()
});

// Error Handlers
bot.on("error", (e) => console.error("Error " + e));
bot.on("warn", (e) => console.warn("Warn " + e));

// Load command files
const events = requireAll({
	dirname: __dirname + '/events',
	filter: /^(?!-)(.+)\.js$/,
});

// Bind the client events to the files
for (const name in events) {
	const event = events[name];
	bot.on(name, event.bind(null, bot));
}
// Fetch commands
function getCommands(dir, callback) {
	fs.readdir(dir, (err, files) => {
		if (err) throw err;
		files.forEach((file) => {
			const filepath = path.join(dir, file);
			fs.stat(filepath, (err, stats) => {
				if (stats.isDirectory()) {
					getCommands(filepath, callback);
				}
				else if (stats.isFile() && file.endsWith('.js')) {
					const command = require(`./${filepath}`);
					bot.commands.set(command.help.name, command);
					console.log(`${command.help.name}.js loaded!`)
				}
			});
		});
	});
}

getCommands('./commands/');

bot.login(settings.token).catch(e => { console.log(e); });
mongoose.init();