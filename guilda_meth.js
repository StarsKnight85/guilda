// all meths for guilda

GuildaMeth = function(guilda){
    // variables

    //methods
    this.checkAdmin = function(){
        if(guilda.checkAdmin(guilda.message)){
            guilda.logAct("#CheckAdmin", guilda.message, guilda.channelList.adminChannel(guilda.message.guild.name))
        }
    }

    this.checkUser = function(){
        guilda.logAct("#checkUser", guilda.message, guilda.channelList.adminChannel(guilda.message.guild.name))
    };

    this.addChannel = function(guilda, args){
        if(guilda.checkAdmin(guilda.message)){
            admin = false
            if(args[1] === "true"){
                admin = true
            }
            guilda.ChannelList.addChannel(guilda.message.guild.name, [guilda.message.channel.name, guilda.message.channel.id], admin)
        }
    }

    this.addGuild = function(guilda){
        if(guilda.checkAdmin(guilda.message)){
            guilda.ChannelList.addGuild(guilda.message.guild.name);
        }
    }

    this.deleteGuild = function(guilda){
        if(guilda.checkAdmin(guilda.message)){
            guilda.ChannelList.deleteGuild(guilda.message.guild.name);
        }
    }

    this.deleteChannel = function(guilda){
        if(guilda.checkAdmin(guilda.message)){
            guilda.ChannelList.deleteChannel(guilda.message.guild.name, guilda.message.channel.name);
        }
    }
};

module.exports = GuildaMeth;