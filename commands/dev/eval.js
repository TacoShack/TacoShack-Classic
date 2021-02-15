const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
        .setTimestamp()

    let code = args.join(" ");
    try {
        let evaled = eval(code);

        embed.setDescription("**✅ Evaluated successfully.**\n```js\n" + evaled + "```")
        message.channel.send(embed)
    } catch (e) {
        if (typeof (e) == "string") e = e.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
        embed.setDescription("❌ **JavaScript failed.**\n```js" + e + "```")
        message.channel.send(embed)
    }
}



module.exports.help = {
    name: "eval",
    dev: true,
    aliases: ['ev']
}