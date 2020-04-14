module.exports = {
    name: 'addChannel',
    description: 'Ajoute ce channel à la liste des channels du Bot, active l\'admin en précisant \'admin\': \'addChannel <admin>\'',
    permission: 'admin',
    limitedLocationForExe : false,
    execute(guilda, message, args){
        //init
        const {RichEmbed} = require('discord.js');
        const Request = require('../Request.js');

        embed = new RichEmbed();
        embed.setTitle('addChannel');
        
        //code
        let adminPerm = false
        if (args[1] == 'admin'){
            adminPerm = true;
        }

        if (guilda[0].channels.get(message.channel.id) != undefined){
            //upadate
            guilda[0].sql_update_data(new Request('`channels`', `\`ADMIN\`=${(adminPerm? 1 : 0)}`, `\`ID_Channel\`=${message.channel.id}`), (result)=>{});
            guilda[0].channels.get(message.channel.id).admin = adminPerm;
        }else{
            //create
            guilda[0].sql_create_data(new Request('`channels`', '`ID_Channel`, `ADMIN`, `ID_Guild`', null, `'${message.channel.id}', ${adminPerm}, '${message.guild.id}'`), (result) => {});
            guilda[0].channels.set(`${message.channel.id}`, {
                ID_Channel  : message.channel.id,
                admin       : adminPerm,
                ID_Guild    : message.guild.id,
            });
        }

        embed.addField('✅success',`${(adminPerm? 'admin' : '')} Channel <${message.channel.name}> rajouté!`);
        message.channel.send(embed);

        //end
        delete embed;
    }
}