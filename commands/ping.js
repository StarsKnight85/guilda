module.exports = {
    name: 'ping',
    description: "says pong!",
    permission: "all",
    execute(guilda, message, args){
        message.channel.send('pong!');
    }
}