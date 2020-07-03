const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const upgrades = require("../../data/upgrades.json");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)


    function costCalc(cost, amount) {
        var amountT = amount + 1;
        var amountTotal = amountT * amountT;
        var total = amountTotal * cost;
        return total;
    }

if(!args[1]) {

    var jobmarket = new Discord.RichEmbed()
        .setTitle(`Employees`)
        .setColor('0x3477e2')
        .setThumbnail('https://cdn.dribbble.com/users/72556/screenshots/1711901/8bit-taco.jpg')
        .setDescription(`\n
**Apprentice Chef**  \`(${shacks[message.author.id].employees[231]}/5)\`
Cost: $${costCalc(upgrades[231].price, shacks[message.author.id].employees[231])}
Boost: +$${upgrades[231].boost}/hr
ID: 231\n
**Cook**  \`(${shacks[message.author.id].employees[232]}/5)\`
Cost: $${costCalc(upgrades[232].price, shacks[message.author.id].employees[232])}
Boost: +${upgrades[232].boost}/hr
ID: 232\n
**Sous Chef**  \`(${shacks[message.author.id].employees[233]}/3)\`
Cost: $${costCalc(upgrades[233].price, shacks[message.author.id].employees[233])}
Boost: +${upgrades[233].boost}/hr
ID: 233\n
**Head Chef**  \`(${shacks[message.author.id].employees[234]}/3)\`
Cost: $${costCalc(upgrades[234].price, shacks[message.author.id].employees[234])}
Boost: +${upgrades[234].boost}/hr
ID: 234\n
**Executive Chef**  \`(${shacks[message.author.id].employees[235]}/2)\`
Cost: $${costCalc(upgrades[235].price, shacks[message.author.id].employees[235])}
Boost: +${upgrades[235].boost}/hr
ID: 235\n
**Advertiser**  \`(${shacks[message.author.id].employees[236]}/3)\`
Cost: $${costCalc(upgrades[236].price, shacks[message.author.id].employees[236])}
Boost: +${upgrades[236].boost}/hr
ID: 236\n
**Greeter**  \`(${shacks[message.author.id].employees[237]}/2)\`
Cost: $${costCalc(upgrades[237].price, shacks[message.author.id].employees[237])}
Boost: +${upgrades[237].boost}/hr
ID: 237\n
Use **!hire [ID]** to hire an employee!
Use **!upgrades** to view more boosts!`)


    return message.channel.send({embed:jobmarket})
}



if(args[1]) {

    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)
    var id = args[1].toString()
    if(!upgrades[id]) return message.channel.send(`Please use a valid ID!`)
    if(id > 120 && id < 127) return message.channel.send(`That is an upgrade! Use \`!buy [ID]\` to purchase!`)

    var cost = costCalc(upgrades[id].price, shacks[message.author.id].employees[id])

    if(shacks[message.author.id].balance < upgrades[id].price) return message.channel.send(`You don't have enough money!`)
    if(shacks[message.author.id].employees[id] >= upgrades[id].max) return message.channel.send(`You already have hired the maximum amount!`)

    shacks[message.author.id].balance = shacks[message.author.id].balance - cost
    shacks[message.author.id].income = shacks[message.author.id].income + upgrades[id].boost
    shacks[message.author.id].employees[id] = shacks[message.author.id].employees[id] + 1

    fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
        if(err) console.log(err);
    })

    return message.channel.send(`✅ You have hired a(n) **${upgrades[id].name}** for **$${cost}**`)

}


}

module.exports.help = {
    name: "hire",
    aliases: ["employees"]
}