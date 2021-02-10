const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args, funcs) => {


    return message.channel.send({embed: {color: "dc0000", description: "❌ Slots has been disabled!"}})


/*
    var incorrect = `Please use the correct format: \`${settings.prefix}slots [bet]\`\n\`Ex: ${settings.prefix}slots 100\``
    shacks.findOne({userID: message.author.id}, async (err, data) => {
        if (err){
            message.channel.send('An error occured.')
            return;
        } else if (!data) {
            message.channel.send(`You do not own a shack! Use \`${settings.prefix}found\` to found your shop!`)
            return
        } else if (data) {
            if(!args[0]) return message.channel.send(incorrect);
            if(funcs.bet_check(args[0]) === false) return message.channel.send(incorrect)
            if(parseInt(args[0]) > 2000) return message.channel.send("Maximum bet is **$2,000**!")
            if(parseInt(args[0]) < 10) return message.channel.send("Minimum bet is **$10**!")
            if(data.balance < parseInt(args[0])) return message.channel.send(`You don't have enough money!`)

            var msg = await message.channel.send(`🍒 Spinning slots for **$${args[0]}**... 🍒`)

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
            
                    var reward = parseInt(args[0]) * 5
                    data.balance += reward
                    data.save().catch(err => console.log(err))
            
            
                var slotseee = new Discord.MessageEmbed()
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
            
                    var reward = parseInt(args[0]) * 2.5
                    data.balance += reward
                    data.save().catch(err => console.log(err))
            
            
                var slotseee = new Discord.MessageEmbed()
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
            
                    var reward = parseInt(args[0]) * 1.75
                    data.balance += reward
                    data.save().catch(err => console.log(err))
            
            
                var slotseee = new Discord.MessageEmbed()
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
            
                    var reward = Math.round(parseInt(args[0]) * 1.2)
                    data.balance += reward
                    data.save().catch(err => console.log(err))
            
            
                var slotseee = new Discord.MessageEmbed()
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
            
                var reward = parseInt(args[0])
                data.balance -= reward
                    data.save().catch(err => console.log(err))
            
            
                var slotseee = new Discord.MessageEmbed()
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
    })
    */
}

module.exports.help = {
    name: "slots",
    aliases: ["slot"]
}