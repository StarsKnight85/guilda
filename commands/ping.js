module.exports = {
    name: 'ping',
    description: "says pong!",
    permision: "all",
    execute(message, args){
        message.channel.send('pong!');
    }
}