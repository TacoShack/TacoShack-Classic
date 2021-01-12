const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./util/settings.json');
const shacks = require('./data/shacks.json');
const token = settings.token;
const prefix = settings.prefix;
const fs = require('fs')
const funcs = require('./util/functions.js')
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//ready
bot.on('ready', () => {
    console.log("Taco Shack Ready to Sell Some Tacos!")
    bot.user.setActivity(`with v1.0`)

    // HOURLY INCOME
    setInterval (function () {
        for(var key in shacks) {
            var tacorando = Math.floor(Math.random() * (20 - 5) ) + 5;
            var tacos = Math.floor((Math.round(shacks[key].income / 4)) + tacorando);
            shacks[key].balance = shacks[key].balance + shacks[key].income;
            shacks[key].tacos = shacks[key].tacos + tacos;
            fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
                if(err) console.log(err);
            })
        }
        return bot.channels.get('490361223062355988').send(`Hourly Income Sent!`);

    }, 3600000);

});


//gen
fs.readdir("./commands/gen/", (err, files) => {

    if(err) console.log(err);
    console.log(`Loading a total of ${files.length} General commands.`)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Could not find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/gen/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});

//gen
fs.readdir("./commands/shack/", (err, files) => {

    if(err) console.log(err);
    console.log(`Loading a total of ${files.length} Taco Shack commands.`)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Could not find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/shack/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});

//games
fs.readdir("./commands/games/", (err, files) => {

    if(err) console.log(err);
    console.log(`Loading a total of ${files.length} Game commands.`)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Could not find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/games/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});


//command handler
bot.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.substring(prefix.length).trim().split(/ +/g);
    let command = args[0].toLowerCase();
    let cmd;

    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    } else return message.reply("Please enter a valid command!")
    if (cmd) {
        cmd.run(bot, message, args, funcs);
    }
});


bot.login(token);
