const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");
let cooldown = new Set();
let cdseconds = 300;

module.exports.run = async (bot, message, args) => {

    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)


    if(cooldown.has(message.author.id)) {
        //message.delete();
        message.channel.send("Chill... Money doesn't grow on trees!")

        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, cdseconds * 1000)
    } else {
        var tip = Math.floor(Math.random() * (50 - 10) ) + 10;
        shacks[message.author.id].balance = shacks[message.author.id].balance + tip

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })

        cooldown.add(message.author.id);

        return message.channel.send(`💵 You collected **$${tip}** in tips!`)
    }



}

module.exports.help = {
    name: "tips",
    aliases: ["tip"]
}