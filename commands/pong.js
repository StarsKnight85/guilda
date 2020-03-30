module.exports = {
    name: 'pong',
    description: "says ping!",
    permission: "admin",
    execute(guilda, message, args){
        guilda.functions.newEmbed(guilda)
        guilda.embed.setTitle("ping!")
        message.channel.send(guilda.embed)
    }
}