module.exports = {
    name: 'pong',
    description: 'dit ping!',
    permission: 'admin',
    limitedLocationForExe : true,
    execute(bot, message, args){
        message.reply('ping!');
    }
}