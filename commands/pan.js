module.exports = {
    name: 'pan',
    description: "says pan!",
    permission: "all",
    execute(guilda, message, args){
        guilda.functions.newEmbed(guilda)
        guilda.embed.setTitle("🎉PAN!🎉")
        message.channel.sendEmbed(guilda.embed)
    }
}