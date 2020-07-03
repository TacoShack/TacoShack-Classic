const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args, funcs) => {

    var incorrect = `Please use the correct format: \`!flip [heads/tails] [bet]\`\n\`Ex: !flip heads 100\``

    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)
    if(!args[1] || !args[2]) return message.channel.send(incorrect);
    if(funcs.bet_check(args[2]) === false) return message.channel.send(incorrect)
    if(args[1].toLowerCase() != "heads" && args[1].toLowerCase() != "tails")  return message.channel.send(incorrect) 
    if(parseInt(args[2]) > 2000) return message.channel.send("Maximum bet is **$2,000**!")
    if(parseInt(args[2]) < 10) return message.channel.send("Minimum bet is **$10**!")
    if(shacks[message.author.id].balance < parseInt(args[2])) return message.channel.send(`You don't have enough money!`)

    function random(array){
        var outcome = array[Math.floor(Math.random()*array.length)];
        return outcome;
    }
    function Capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var bet = parseInt(args[2]);
    var prediction = args[1].toLowerCase();
    var outcomes = ["heads", "tails"];
    var result = random(outcomes);

    if(prediction === result) {
        message.channel.send(`✅ **${Capitalize(result)}**! You won $${bet}!`)

        shacks[message.author.id].balance = shacks[message.author.id].balance + bet

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })
        return;

    }
    if(prediction != result) {
        message.channel.send(`❌ **${Capitalize(result)}**! You lost $${bet}!`)

        shacks[message.author.id].balance = shacks[message.author.id].balance - bet

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })

        return;
    }

}

module.exports.help = {
    name: "flip",
    aliases: ["coin", "f"]
}