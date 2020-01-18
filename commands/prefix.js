module.exports = {
    name: "prefix",
    description: "set the prefix for the bot",
    permission: "admin",
    execute(guilda, message, args){
        if (args[1] && guilda.setting.PREFIX != args[1]){
            guilda.setting.PREFIX = args[1]
            guilda.functions.writeData("./setting.json",guilda.setting)
            tempObj = guilda.functions.loadData("./setting.json")
            if (tempObj.PREFIX == guilda.setting.PREFIX){
                message.channel.send(`Préfix changer pour ${tempObj.PREFIX}`)
            }
        }else{
            message.channel.send("Veuillez précisez le nouveau préfix!")
        }
    }
}