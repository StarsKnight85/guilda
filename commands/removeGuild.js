module.exports = {
    name: "removeGuild",
    description: "permit to remove the right of speek for your bot in this guild, admin is to turn this channel for admin: \"removeGuild <admin>\"",
    permission: "admin",
    execute(guilda, message, args){
        delete guilda["setting"]["Guilds"][message.guild.id]
        guilda.functions.writeData("./setting.json",guilda.setting)
    }
}