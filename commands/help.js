module.exports = {
    name: 'help',
    description: "help command. You can have help with \"help <command>\"",
    permission: "all",
    execute(guilda, message, args){
        //création de l'embed
        if (args.length == 1){
            let commands = guilda.commands.map(commands => commands.name)
            console.log(`commands:${commands} >type:${typeof commands}`)//debug
            for (command of commands){
                const guildaCommand = guilda.commands.get(command)
                const txt = `>>help-  ${guildaCommand.name}: ${guildaCommand.description} <permission:${guildaCommand.permission}>`
                message.channel.send(txt)
            }
            //console.log(command.name + ":" + command.description)//debug
                //embed with command
        }else{
            txt = `>>help-  ${guilda.commands.get(args[1]).name}: ${guilda.commands.get(args[1]).description}  <permission:${guilda.commands.get(args[1]).permission}>`
            message.channel.send(txt)
        }
    }
}