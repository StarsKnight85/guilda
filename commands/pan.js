module.exports = {
    name: 'pan',
    description: 'dit pan!',
    permission: 'all',
    limitedLocationForExe : true,
    execute(guilda, message, args){
        //init
        const {RichEmbed} = require('discord.js');
        //code
        embed = new RichEmbed();
        embed.setTitle('🎉PAN!🎉');
        message.channel.send(embed);

        //end
        delete embed;
    }
}