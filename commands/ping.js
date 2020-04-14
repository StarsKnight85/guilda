module.exports = {
    name: 'ping',
    description: 'dit pong!',
    permission: 'all',
    limitedLocationForExe : true,
    execute(bot, message, args){
        message.reply('pong!');
    }
}