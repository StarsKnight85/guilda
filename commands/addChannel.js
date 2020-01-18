module.exports = {
    name: 'addChannel',
    description: "permit to your bot to speek in this channel, admin is to turn this channel for admin: \"addChannel <admin>\"",
    permission: "admin",
    execute(guilda, message, args){
        var adminPerm = false
        if (args[1] == "admin"){
            adminPerm = true
        }
        if (guilda["setting"]["Guilds"][message.guild.id] === undefined){
            guilda["setting"]["Guilds"][message.guild.id] = {
                name: message.guild.name,
                id: message.guild.id,
            }
        }
        if (guilda["setting"]["Guilds"][message.guild.id]["Channels"] === undefined){
            guilda["setting"]["Guilds"][message.guild.id]["Channels"] = {}
        }
        guilda["setting"]["Guilds"][message.guild.id]["Channels"][message.channel.id] = {
            name: message.channel.name,
            id: message.channel.id,
            admin: adminPerm
        }
        guilda.functions.writeData("./setting.json",guilda.setting)
        message.channel.send(`Channel <${message.channel.name}> rajouté! <admin:${guilda["setting"]["Guilds"][message.guild.id]["Channels"][message.channel.id]["admin"]}>`)
    }
}