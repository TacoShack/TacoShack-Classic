const Discord = require('discord.js');
const settings = require('../../util/settings.json');
//const shacks = require("../../data/shacks.json");
const prefix = settings.prefix;
const fs = require("fs");
const shacks  = require('../../schemas/shacks.js');
module.exports.run = async (bot, message, args) => {

    shacks.findOne({userID: message.author.id}, (err, data) => {
        if (err) {
            console.log(err)
            message.channel.send('An error occured.')
        }
        else if (data){
            message.channel.send('You already own a taco shack!')
            return;
        }
        else if (!data) {
            const newData = new shacks({
                userID: message.author.id,
                name: `${message.author.username}'s Taco Shack`,
                server: message.guild.name,
                joined: Date.now(),
                balance: 1000,
                income: 100,
                tacos: 0,
                work: 0,
                tips: 0,
                daily: 0,
                upgrades: {
                    121: 0,
                    122: 0,
                    123: 0,
                    124: 0,
                    125: 0,
                    126: 0
                },
                employees: {
                    231: 0,
                    232: 0,
                    233: 0,
                    234: 0,
                    235: 0,
                    236: 0,
                    237: 0
                }
                    })
                    newData.save().catch(err => console.log(err))
                    method =  newData.reminderMethod
                }

                message.reply("Your account was created! Check your DM for more info!");

 
                var helpdm = new Discord.MessageEmbed()
                .setColor('0x1ed606')
                .setDescription(`🌮 __**Your brand new taco shack is now in business!**__ 🌮\n
        🔹 You are in charge of running your taco shack! You will get **hourly income** to pay for things.
        🔹 You can increase your income by purchasing **upgrades** or hiring **employees**!
        🔹 You yourself can also work every **10** minutes, and collect tips every **5** minutes to make some cash.
        
        🔸 Become the most sucessful taco shack around by reaching the **top of the leaderboard**!
        🔸 Either top the **Most Tacos Sold** or the **Richest** leaderboard for bragging rights.
        
        **Contact @Cole#7575 if you need any further help!**`)
                message.author.send({embed: helpdm})
                .catch(error => {});
            
        
    })
   
    return;

}

module.exports.help = {
    name: "found",
    aliases: ["create", "start"]
}