module.exports = {
    name: "prefix",
    description: "set the prefix for the bot",
    permission: "admin",
    execute(guilda, message, args){
        guilda.functions.newEmbed(guilda)
        guilda.embed.setTitle("Prefix")
        if (args[1] && guilda.setting.PREFIX != args[1]){
            guilda.setting.PREFIX = args[1]
            guilda.functions.writeData("./setting.json",guilda.setting)
            tempObj = guilda.functions.loadData("./setting.json")
            if (tempObj.PREFIX == guilda.setting.PREFIX){
                guilda.embed.addField("Préfix changer pour:",tempObj.PREFIX)
            }
        }else{
            guilda.embed.addField("#ERROR#","Veuillez précisez le nouveau préfix!")
        }
        message.channel.send(guilda.embed)
    }
}