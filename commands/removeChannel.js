module.exports = {
    name: "removeChannel",
    description: "permit to remove the right of speek for your bot in this channel, admin is to turn this channel for admin: \"removeChannel <admin>\"",
    permission: "admin",
    execute(guilda, message, args){
        delete guilda["setting"]["Guilds"][message.guild.id]["Channels"][message.channel.id]
        guilda.functions.writeData("./setting.json",guilda.setting)
    }
}