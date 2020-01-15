module.exports = {
    name: 'pan',
    description: "says pan!",
    permission: "all",
    execute(guilda, message, args){
        message.channel.send("PAN!")
    }
}