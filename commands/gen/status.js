module.exports.run = async (bot, message) => {
    return message.channel.send("🌮 Ready to sell some tacos!");
}

module.exports.help = {
    name: "status",
    aliases: ["s"]
}