module.exports = {
    name: 'help',
    description: 'Commande d\'help, si vous voyez ceci c\' que vous la connaissez ^^, pour de l\'aide su une commande précise utilisez: \'help <commande>\'',
    permission: 'all',
    limitedLocationForExe : false,
    execute(guilda, message, args){
        //init
        const {RichEmbed} = require('discord.js');
        const embed = new RichEmbed();
        embed.setTitle('Help🤝');
        
        //toutes les commandes
        if (args.length == 1){
            let commands = guilda[0].commands.map(commands => commands.name);
            for (command of commands){
                if (guilda[0].discord_can_exe(message, command)){
                    const guildaCommand = guilda[0].commands.get(command);
                    //admin
                    if (guildaCommand.permission == 'admin'){
                        var adminTxt = '🔐 ';
                    }else{
                        var adminTxt = '';
                    }
                    //location
                    if (guildaCommand.limitedLocationForExe){
                        var locationTxt = '⏬ ';
                    }else{
                        var locationTxt =''
                    }
                    const txt = adminTxt + locationTxt + guildaCommand.description;
                    embed.addField(guildaCommand.name,txt);
                }
            }
        //un commande en particulier
        }else{
            if (guilda[0].discord_have_perm_to_exe(message, args[1])){
                if (guilda[0].discord_command_have_perm_to_exe(message, args[1])){
                    let command = guilda[0].commands.get(args[1]);
                    if (command != undefined){
                        if (command.permission == 'admin'){
                            adminTxt = '🔐';
                        }else{
                            adminTxt = ''
                        }
    
                        txt = `${adminTxt} ${guilda[0].commands.get(args[1]).description}`
                        embed.addField(guilda[0].commands.get(args[1]).name, txt);
                    }
                }
            }else{
                embed.addField('❌'+args[1],'cette commande n\'existe pas pour vous!');
            }
        }

        //envoie
        try{
            if (embed['fields'][0]['name']){
                message.channel.send(embed);
            }
        }catch(err){
            //err
        }

        //end
        delete embed;
    }
}