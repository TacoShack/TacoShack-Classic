const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
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

if(args[0]) {

    shacks.findOne({userID: message.author.id}, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`${settings.prefix}found\` to found your shop!`)
            return;
        } else if (data){
            var id = args[0].toString()
            if(!upgrades[id]) return message.channel.send(`Please use a valid ID!`)
            if(id > 230 && id < 238) return message.channel.send(`That is an employee! Use \`${settings.prefix}hire [ID]\` to hire!`)
            var cost = costCalc(upgrades[id].price, data.upgrades[id])
            if(data.balance < cost) return message.channel.send(`You don't have enough money!`)
            if(data.upgrades[id] >= upgrades[id].max) return message.channel.send(`You already have purchased the maximum amount!`)

            if(data.balance < cost) return message.channel.send(`You don't have enough money!`)
            if(data.upgrades[id] >= upgrades[id].max) return message.channel.send(`You already have purchased the maximum amount!`)

            data.balance -= cost
            data.income += upgrades[id].boost
            data.upgrades[id] += 1
            data.save().catch(err => console.log(err))
            return message.channel.send(`✅ You have purchased a **${upgrades[id].name}** for **$${cost}**`)
        }
    })

} else return message.channel.send("Please specify an ID!")


}

module.exports.help = {
    name: "buy",
    aliases: ["purchase"]
}