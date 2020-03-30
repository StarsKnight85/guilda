module.exports = {
    name: 'addChannel',
    description: "permit to your bot to speek in this channel, admin is to turn this channel for admin: \"addChannel <admin>\"",
    permission: "admin",
    execute(guilda, message, args){
        guilda.functions.newEmbed(guilda)
        guilda.embed.setTitle("addChannel")
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
        guilda.functions.writeData(guilda.setting.path_to_setting + "setting.json",guilda.setting)
        if (guilda["setting"]["Guilds"][message.guild.id]["Channels"][message.channel.id]["admin"]){
            adminTxt = "🔐"
        }else{
            adminTxt = ""
        }
        guilda.embed.addField("success",`${adminTxt} Channel <${message.channel.name}> rajouté!`)
        message.channel.send(guilda.embed)
    }
}