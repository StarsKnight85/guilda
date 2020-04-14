module.exports = {
    name: 'prefix',
    description: 'change le préfix du bot',
    permission: 'admin',
    limitedLoactionForExe : true,
    execute(guilda, message, args){
        //init
        const {RichEmbed} = require('discord.js');
        const Request = require('../Request.js');

        const embed = new RichEmbed();
        embed.setTitle('Préfix');
        //bot
        if (args[1] && guilda[0].setting.prefix != args[1]){
            guilda[0].sql_update_data(new Request('`config`', `\`PREFIX\`='${args[1]}'`, `\`NOM\`='${guilda[0].setting.name}'`), (result) => {});
            guilda[0].setting.prefix = args[1];
            embed.addField('✅préfix changer pour:',args[1]);
        }else{
            embed.addField('❌ERROR#','Veuillez précisez le nouveau préfix!');
        }
        message.channel.send(embed);

        //end
        delete embed;
    }
}