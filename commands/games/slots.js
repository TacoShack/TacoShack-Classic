const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args, funcs) => {

    var incorrect = `Please use the correct format: \`!slots [bet]\`\n\`Ex: !slots 100\``

    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)
    if(!args[1]) return message.channel.send(incorrect);
    if(funcs.bet_check(args[1]) === false) return message.channel.send(incorrect)
    if(parseInt(args[1]) > 2000) return message.channel.send("Maximum bet is **$2,000**!")
    if(parseInt(args[1]) < 10) return message.channel.send("Minimum bet is **$10**!")
    if(shacks[message.author.id].balance < parseInt(args[1])) return message.channel.send(`You don't have enough money!`)

    var msg = await message.channel.send(`🍒 Spinning slots for **$${args[1]}**... 🍒`)

    setTimeout(function () {  
    msg.delete()

    const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];
    const slot4 = slots[Math.floor(Math.random() * slots.length)];
    const slot5 = slots[Math.floor(Math.random() * slots.length)];
    const slot6 = slots[Math.floor(Math.random() * slots.length)];
    const slot7 = slots[Math.floor(Math.random() * slots.length)];
    const slot8 = slots[Math.floor(Math.random() * slots.length)];
    const slot9 = slots[Math.floor(Math.random() * slots.length)];
    const slot10 = slots[Math.floor(Math.random() * slots.length)];
    const slot11 = slots[Math.floor(Math.random() * slots.length)];
    const slot12 = slots[Math.floor(Math.random() * slots.length)];
    const slot13 = slots[Math.floor(Math.random() * slots.length)];
    const slot14 = slots[Math.floor(Math.random() * slots.length)];
    const slot15 = slots[Math.floor(Math.random() * slots.length)];



    if(slot6 === slot7 && slot7 === slot8 && slot8 === slot9 && slot9 === slot10) {

        var reward = parseInt(args[1]) * 5
        shacks[message.author.id].balance = shacks[message.author.id].balance + reward

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })


    var slotseee = new Discord.RichEmbed()
    .setColor('0xffea07')
    .setAuthor("---- Slots ----")
    .setDescription(`
|${slot1}|${slot2}|${slot3}|${slot4}|${slot5}|\n\
>${slot6}|${slot7}|${slot8}|${slot9}|${slot10}< **Payline**\n\
|${slot11}|${slot12}|${slot13}|${slot14}|${slot15}|\n\n\
🎉 JACKPOT 🎉
✅ You win **$${reward}!**`)

    return message.channel.send({embed: slotseee});
    }

    if((slot6 === slot7 && slot7 === slot8 && slot8 === slot9) || (slot7 === slot8 && slot8 === slot9 && slot9 === slot10)) {

        var reward = parseInt(args[1]) * 2.5
        shacks[message.author.id].balance = shacks[message.author.id].balance + reward

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })


    var slotseee = new Discord.RichEmbed()
    .setColor('0xffea07')
    .setAuthor("---- Slots ----")
    .setDescription(`
|${slot1}|${slot2}|${slot3}|${slot4}|${slot5}|\n\
>${slot6}|${slot7}|${slot8}|${slot9}|${slot10}< **Payline**\n\
|${slot11}|${slot12}|${slot13}|${slot14}|${slot15}|\n\n\
✅ You win **$${reward}!**`)

    return message.channel.send({embed: slotseee});

    }

    if((slot6 === slot7 && slot7 === slot8) || (slot7 === slot8 && slot8 === slot9) || (slot8 === slot9 && slot9 === slot10)) {

        var reward = parseInt(args[1]) * 1.75
        shacks[message.author.id].balance = shacks[message.author.id].balance + reward

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })


    var slotseee = new Discord.RichEmbed()
    .setColor('0xffea07')
    .setAuthor("---- Slots ----")
    .setDescription(`
|${slot1}|${slot2}|${slot3}|${slot4}|${slot5}|\n\
>${slot6}|${slot7}|${slot8}|${slot9}|${slot10}< **Payline**\n\
|${slot11}|${slot12}|${slot13}|${slot14}|${slot15}|\n\n\
✅ You win **$${reward}!**`)

    return message.channel.send({embed: slotseee});
    }

    if(slot6 === slot7 || slot7 === slot8 || slot8 === slot9 || slot9 === slot10) {

        var reward = Math.round(parseInt(args[1]) * 1.2)
        shacks[message.author.id].balance = shacks[message.author.id].balance + reward

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })


    var slotseee = new Discord.RichEmbed()
    .setColor('0xffea07')
    .setAuthor("---- Slots ----")
    .setDescription(`
|${slot1}|${slot2}|${slot3}|${slot4}|${slot5}|\n\
>${slot6}|${slot7}|${slot8}|${slot9}|${slot10}< **Payline**\n\
|${slot11}|${slot12}|${slot13}|${slot14}|${slot15}|\n\n\
✅ You win **$${reward}!**`)

return message.channel.send({embed: slotseee});

}

    else {

    var reward = parseInt(args[1])
    shacks[message.author.id].balance = shacks[message.author.id].balance - reward

    fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
        if(err) console.log(err);
    })


    var slotseee = new Discord.RichEmbed()
    .setColor('0xffea07')
    .setAuthor("---- Slots ----")
    .setDescription(`
|${slot1}|${slot2}|${slot3}|${slot4}|${slot5}|\n\
>${slot6}|${slot7}|${slot8}|${slot9}|${slot10}< **Payline**\n\
|${slot11}|${slot12}|${slot13}|${slot14}|${slot15}|\n\n\
❌ You lose!`)

    return message.channel.send({embed: slotseee});


    }

}, 1500);
}

module.exports.help = {
    name: "slots",
    aliases: ["slot"]
}