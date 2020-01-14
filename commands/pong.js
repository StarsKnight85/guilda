module.exports = {
    name: 'pong',
    description: "says ping!",
    permision: "admin",
    execute(message, args){
        message.channel.send('ping!');
    }
}