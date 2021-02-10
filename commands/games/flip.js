const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args, funcs) => {
    var incorrect = `Please use the correct format: \`${settings.prefix}flip [heads/tails] [bet]\`\n\`Ex: ${settings.prefix}flip heads 100\``
    
    shacks.findOne({userID: message.author.id}, (err, data) => {
        if (err){
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`${settings.prefix}found\` to found your shop!`)
            return
        } else if (data) {
            if(!args[0] || !args[1]) return message.channel.send(incorrect);
            if(funcs.bet_check(args[1]) === false) return message.channel.send(incorrect)
            if(args[0].toLowerCase() != "heads" && args[0].toLowerCase() != "tails")  return message.channel.send(incorrect) 
            if(parseInt(args[1]) > 2000) return message.channel.send("Maximum bet is **$2,000**!")
            if(parseInt(args[1]) < 10) return message.channel.send("Minimum bet is **$10**!")
            if(data.balance < parseInt(args[1])) return message.channel.send(`You don't have enough money!`)

            function random(array){
                var outcome = array[Math.floor(Math.random()*array.length)];
                return outcome;
            }
            function Capitalize(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
            var bet = parseInt(args[1]);
            var prediction = args[0].toLowerCase();
            var outcomes = ["heads", "tails"];
            var result = random(outcomes);
        
            if(prediction === result) {
                message.channel.send(`✅ **${Capitalize(result)}**! You won $${bet}!`)
        
                data.balance += bet
                data.save().catch(err => console.log(err))
                return;
        
            }
            if(prediction != result) {
                message.channel.send(`❌ **${Capitalize(result)}**! You lost $${bet}!`)
        
                data.balance -= bet
                data.save().catch(err => console.log(err))
                return;
            }
        }
    })

    

}

module.exports.help = {
    name: "flip",
    aliases: ["coin"]
}