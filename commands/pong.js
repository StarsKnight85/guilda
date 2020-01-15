module.exports = {
    name: 'pong',
    description: "says ping!",
    permission: "admin",
    execute(guilda, message, args){
        message.channel.send('ping!');
    }
}