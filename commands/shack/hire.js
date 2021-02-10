const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const upgrades = require("../../data/upgrades.json");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {



    function costCalc(cost, amount) {
        var amountT = amount + 1;
        var amountTotal = amountT * amountT;
        var total = amountTotal * cost;
        return total;
    }

if(!args[0]) {

    shacks.findOne({userID: message.author.id}, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)
            return;
        } else if (data){

    var jobmarket = new Discord.MessageEmbed()
        .setTitle(`Employees`)
        .setColor('0x3477e2')
        .setThumbnail('https://cdn.dribbble.com/users/72556/screenshots/1711901/8bit-taco.jpg')
        .setDescription(`\n
**Apprentice Chef**  \`(${data.employees[231]}/15)\`
Cost: $${costCalc(upgrades[231].price, data.employees[231])}
Boost: +$${upgrades[231].boost}/hr
ID: 231\n
**Cook**  \`(${data.employees[232]}/15)\`
Cost: $${costCalc(upgrades[232].price, data.employees[232])}
Boost: +${upgrades[232].boost}/hr
ID: 232\n
**Sous Chef**  \`(${data.employees[233]}/13)\`
Cost: $${costCalc(upgrades[233].price, data.employees[233])}
Boost: +${upgrades[233].boost}/hr
ID: 233\n
**Head Chef**  \`(${data.employees[234]}/13)\`
Cost: $${costCalc(upgrades[234].price, data.employees[234])}
Boost: +${upgrades[234].boost}/hr
ID: 234\n
**Executive Chef**  \`(${data.employees[235]}/12)\`
Cost: $${costCalc(upgrades[235].price, data.employees[235])}
Boost: +${upgrades[235].boost}/hr
ID: 235\n
**Advertiser**  \`(${data.employees[236]}/13)\`
Cost: $${costCalc(upgrades[236].price, data.employees[236])}
Boost: +${upgrades[236].boost}/hr
ID: 236\n
**Greeter**  \`(${data.employees[237]}/12)\`
Cost: $${costCalc(upgrades[237].price, data.employees[237])}
Boost: +${upgrades[237].boost}/hr
ID: 237\n
Use **!hire [ID]** to hire an employee!
Use **!upgrades** to view more boosts!`)


    return message.channel.send({embed:jobmarket})
        }
    })
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
            if(id > 120 && id < 127) return message.channel.send(`That is an upgrade! Use \`${settings.prefix}buy [ID]\` to purchase!`)

            var cost = costCalc(upgrades[id].price, data.employees[id])

            if(data.balance < cost) return message.channel.send(`You don't have enough money!`)
            if(data.employees[id] >= upgrades[id].max) return message.channel.send(`You already have hired the maximum amount!`)

            data.balance -= cost
            data.income += upgrades[id].boost
            data.employees[id] += 1
            data.save().catch(err => console.log(err))
        
            return message.channel.send(`✅ You have hired a(n) **${upgrades[id].name}** for **$${cost}**`)
        }
    })
}
}

module.exports.help = {
    name: "hire",
    aliases: ["employees"]
}