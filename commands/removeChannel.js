module.exports = {
    name: 'removeChannel',
    description: 'enlève les droits pour les channels du Bot: \'removeChannel\'',
    permission: 'admin',
    limitedLocationForExe : false,
    execute(guilda, message, args){
        //init
        const {RichEmbed} = require('discord.js');
        const Request = require('../Request.js');

        embed = new RichEmbed();
        embed.setTitle('removeChannel')
        //code
        if (guilda[0].channels.get(message.channel.id) != undefined){
            guilda[0].sql_delete_data(new Request('`channels`', '', `\`ID_Channel\`='${message.channel.id}'`), (result) => {
                delete guilda[0].channels.get(message.channel.id);
                embed.addField('✅Success', `channel <${message.channel.name}> enlevé!`);
                message.channel.send(embed);
                //end
                delete embed;
            });
        }
    }
}