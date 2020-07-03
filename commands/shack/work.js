const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");
let cooldown = new Set();
let cdseconds = 600;

module.exports.run = async (bot, message, args) => {

    if(!shacks[message.author.id]) return message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)


    if(cooldown.has(message.author.id)) {
        message.channel.send("Chill... Don't overwork yourself!")

        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, cdseconds * 1000)
    } else {
        var tacos = Math.floor(Math.random() * (30 - 5) ) + 5;
        var money = Math.floor(Math.random() * (100 - 20) ) + 20;
        shacks[message.author.id].balance = shacks[message.author.id].balance + money
        shacks[message.author.id].tacos = shacks[message.author.id].tacos + tacos

        fs.writeFile("././data/shacks.json", JSON.stringify(shacks, null, 4), (err) => {
            if(err) console.log(err);
        })

        cooldown.add(message.author.id);

        return message.channel.send(`💵 You cooked **${tacos}** tacos and earned **$${money}** while working!`)
    }



}

module.exports.help = {
    name: "work",
    aliases: ["cook"]
}