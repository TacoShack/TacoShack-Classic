const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const upgrades = require("../../data/upgrades.json");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args, funcs) => {

    function costCalc(cost, amount) {
        var amountT = amount + 1;
        var amountTotal = amountT * amountT;
        var total = amountTotal * cost;
        return total;
    }

if(args[1]) {

   // if(funcs.check_NaN(message.author.id) === false) return message.reply("Your balance and income was reset to **$100** for having a **NaN** balance/income!")


    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)
    var id = args[1].toString()
    if(!upgrades[id]) return message.channel.send(`Please use a valid ID!`)
    if(id > 230 && id < 238) return message.channel.send(`That is an employee! Use \`!hire [ID]\` to hire!`)

    var cost = costCalc(upgrades[id].price, shacks[message.author.id].upgrades[id])

    if(shacks[message.author.id].balance < cost) return message.channel.send(`You don't have enough money!`)
    if(shacks[message.author.id].upgrades[id] >= upgrades[id].max) return message.channel.send(`You already have purchased the maximum amount!`)


    shacks[message.author.id].balance = shacks[message.author.id].balance - cost
    shacks[message.author.id].income = shacks[message.author.id].income + upgrades[id].boost
    shacks[message.author.id].upgrades[id] = shacks[message.author.id].upgrades[id] + 1

    fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
        if(err) console.log(err);
    })

    return message.channel.send(`✅ You have purchased a **${upgrades[id].name}** for **$${cost}**`)

} else return message.channel.send("Please specify an ID!")


}

module.exports.help = {
    name: "buy",
    aliases: ["purchase"]
}