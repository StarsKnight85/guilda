const Discord = require("discord.js")
module.exports = {
    log: function(message, args, date, admin){
        console.log(">>Command <"+args+"> by <"+message.author.tag+"> at "+date+" <admin:"+admin+">")
    },
    date: function(){
        const d = new Date();
        return "<" + d.toDateString() + " " + d.toTimeString() + ">"
    },
    loadData: function(file){
        const fs = require('fs');
        let settingData = fs.readFileSync(file)
        return JSON.parse(settingData);
    },
    writeData: function(file, data){
        const fs = require('fs');
        let temp = JSON.stringify(data, null, 2);
        fs.writeFileSync(file, temp);
    },
    /*uptdateData: function(file, data){
        const fs = require('fs');
        let temp = JSON.stringify(data, null, 2);
        fs.writeFileSync(file, temp);
        return loadData(file)
    },*/
    checkAdmin: function(message){//PoF
        return message.member.hasPermission("ADMINISTRATOR")
    },
    hasPermissionToExe: function (guilda, message, command) {
        const commandPerm = guilda.commands.get(command).permission
        var commandPermLevel = false
        if (commandPerm == "admin"){
            commandPermLevel = true;
        }
        const userPermLevel = guilda.functions.checkAdmin(message)
        if (commandPermLevel && userPermLevel != commandPermLevel){
            return false
        }else{
            return true
        }
    },
    canExeInChannel: function (guilda, message, command) {
        try{
            if (guilda.commands.get(command).permission == "admin"){
                if (guilda["setting"]["Guilds"][message.guild.id]["Channels"][message.channel.id]["admin"]){
                    return true
                }else{
                    return false
                }
            }else{
                return true
            }
        }catch(err){
            return false
        }
    },
    isInChannel: function(guilda, message){
        try{
            return (guilda["setting"]["Guilds"][message.guild.id]["Channels"][message.channel.id] != undefined)
        }catch(err){
            return false
        }
    },
    isInAdminChannel: function(guilda, message){
        try {
            return guilda["setting"]["Guilds"][message.guild.id]["Channels"][message.channel.id]["admin"]
        }catch(err){
            return false
        }
    },
    newEmbed: function(guilda){
        guilda.embed = new Discord.RichEmbed()
    }
};