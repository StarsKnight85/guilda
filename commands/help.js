module.exports = {
    name: 'help',
    description: "help command. You can have help with \"help <command>\"",
    permission: "all",
    execute(guilda, message, args){
        guilda.functions.newEmbed(guilda)
        guilda.embed.setTitle('Help');
        if (args.length == 1){
            let commands = guilda.commands.map(commands => commands.name)
            for (command of commands){
                if (guilda.functions.hasPermissionToExe(guilda, message, command)){
                    if (guilda.functions.canExeInChannel(guilda, message, command)){
                        const guildaCommand = guilda.commands.get(command)
                        if (guildaCommand.permission == "admin"){
                            adminTxt = "🔐";
                        }else{
                            adminTxt = ""
                        }
                        const txt = `${adminTxt} ${guildaCommand.description}`
                        guilda.embed.addField(guildaCommand.name,txt)       
                    }
                }
            }
        }else{
            if (guilda.functions.hasPermissionToExe(guilda, message, args[0])){
                if (guilda.functions.canExeInChannel(guilda, message, args[1])){
                    if (guilda.commands.get(args[1]).permission == "admin"){
                        adminTxt = "🔐";
                    }else{
                        adminTxt = ""
                    }
                    txt = `${adminTxt} ${guilda.commands.get(args[1]).description}`
                    guilda.embed.addField(guilda.commands.get(args[1]).name, txt)
                }
            }else{
                guilda.embed.addField("vous n'avez pas la permission pour cette commande!")
            }
        }
        try{
            if (guilda["embed"]["fields"][0]["name"]){
                message.channel.send(guilda.embed)
            }
        }catch(err){

        }
    }
}