module.exports = {
    name: 'ping',
    description: "says pong!",
    permission: "all",
    execute(guilda, message, args){
        guilda.functions.newEmbed(guilda)
        guilda.embed.setTitle("pong")
        message.channel.send(guilda.embed)
    }
}