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

    var upgrades_embed = new Discord.RichEmbed()
        .setTitle(`Upgrades`)
        .setColor('0x1ced31')
        .setThumbnail('https://cdn.dribbble.com/users/72556/screenshots/1711901/8bit-taco.jpg')
        .setDescription(`\n
**New Paint**  \`(${shacks[message.author.id].upgrades[121]}/3)\`
Cost: $${costCalc(upgrades[121].price, shacks[message.author.id].upgrades[121])}
Boost: +$${upgrades[121].boost}/hr
ID: 121\n
**New Furniture**  \`(${shacks[message.author.id].upgrades[122]}/3)\`
Cost: $${costCalc(upgrades[122].price, shacks[message.author.id].upgrades[122])}
Boost: +$${upgrades[122].boost}/hr
ID: 122\n
**Better Appliances**  \`(${shacks[message.author.id].upgrades[123]}/5)\`
Cost: $${costCalc(upgrades[123].price, shacks[message.author.id].upgrades[123])}
Boost: +$${upgrades[123].boost}/hr
ID: 123\n
**Nicer Batchrooms**  \`(${shacks[message.author.id].upgrades[124]}/2)\`
Cost: $${costCalc(upgrades[124].price, shacks[message.author.id].upgrades[124])}
Boost: +$${upgrades[124].boost}/hr
ID: 124\n
**Billboard**  \`(${shacks[message.author.id].upgrades[125]}/5)\`
Cost: $${costCalc(upgrades[125].price, shacks[message.author.id].upgrades[125])}
Boost: +$${upgrades[125].boost}/hr
ID: 125\n
**Cooler Tip Jar**  \`(${shacks[message.author.id].upgrades[126]}/3)\`
Cost: $${costCalc(upgrades[126].price, shacks[message.author.id].upgrades[126])}
Boost: +$${upgrades[126].boost}/hr
ID: 126\n
Use **!buy [ID]** to purchase an item!
Use **!hire** to hire new employees for more boosts!`)


    return message.channel.send({embed:upgrades_embed})
}

module.exports.help = {
    name: "upgrades",
    aliases: ["shop"]
}