const Discord = require('discord.js');
const settings = require('../../util/settings.json');
const shacks = require("../../schemas/shacks.js");
const prefix = settings.prefix;
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    shacks.findOne({userID: message.author.id}, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
        }
        else if (!data){
            message.channel.send(`You do not own a shack! Use \`!found\` to found your shop!`)
            return;
        }
        else if (data) {
            //var arlen = args[0].length + 2;
            var params = args.join(' ')
        
            if(!args[0]) return message.reply(`Please use the correct format! \`!name [new name]\``);
            if(params.length < 3) return message.reply(`Please use more than \`3\` characters!`);
            if(params.length > 30) return message.reply(`Please use less than \`30\` characters!`);
            if(!isNaN(params)) return message.reply(`Please use letters!`);

            data.name = params
            data.save().catch(err => console.log(err))
            return message.channel.send(`✅ Changed name to: **${data.name}**`)
        }
    })
}

module.exports.help = {
    name: "name",
    aliases: ["rename"]
}