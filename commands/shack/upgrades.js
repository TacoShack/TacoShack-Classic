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

    shacks.findOne({userID: message.author.id}, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`${settings.prefix}found\` to found your shop!`)
            return;
        } else if (data){

            var upgrades_embed = new Discord.MessageEmbed()
        .setTitle(`Upgrades`)
        .setColor('0x1ced31')
        .setThumbnail('https://cdn.dribbble.com/users/72556/screenshots/1711901/8bit-taco.jpg')
        .setDescription(`\n
**New Paint**  \`(${data.upgrades[121]}/13)\`
Cost: $${costCalc(upgrades[121].price, data.upgrades[121])}
Boost: +$${upgrades[121].boost}/hr
ID: 121\n
**New Furniture**  \`(${data.upgrades[122]}/13)\`
Cost: $${costCalc(upgrades[122].price, data.upgrades[122])}
Boost: +$${upgrades[122].boost}/hr
ID: 122\n
**Better Appliances**  \`(${data.upgrades[123]}/15)\`
Cost: $${costCalc(upgrades[123].price, data.upgrades[123])}
Boost: +$${upgrades[123].boost}/hr
ID: 123\n
**Nicer Batchrooms**  \`(${data.upgrades[124]}/12)\`
Cost: $${costCalc(upgrades[124].price, data.upgrades[124])}
Boost: +$${upgrades[124].boost}/hr
ID: 124\n
**Billboard**  \`(${data.upgrades[125]}/15)\`
Cost: $${costCalc(upgrades[125].price, data.upgrades[125])}
Boost: +$${upgrades[125].boost}/hr
ID: 125\n
**Cooler Tip Jar**  \`(${data.upgrades[126]}/13)\`
Cost: $${costCalc(upgrades[126].price, data.upgrades[126])}
Boost: +$${upgrades[126].boost}/hr
ID: 126\n
Use **!buy [ID]** to purchase an item!
Use **!hire** to hire new employees for more boosts!`)


    return message.channel.send({embed:upgrades_embed})

        }
    })
}

module.exports.help = {
    name: "upgrades",
    aliases: ["shop"]
}