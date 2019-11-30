const {Client, Message ,Attachment, RichEmbed} = require('discord.js');

// a guilda constructor
const GuildaMain = require('./guilda_main.js')
const ChannelList = require('./channelList.js')

Guilda = function(Client){
  // variables
  this.Client = Client
  this.PREFIX = "g!"
  this.channelList = new ChannelList;

  // methods for usefull inter-commands
    // send a log msg
  this.logAct = function(msg, object = null, adminChannel = []){
    var d = new Date();
    txt = "#LogAct: at " + d.toUTCString() + "\n>>";
    try{
      for(i=0; i<adminChannel.length; i++){
        if(object === this.message){
          txt = "#LogAct: message from " + message.author.tag + " in the channel " + message.channel.name + ": " + message.channel.id + " of " + message.guild.name + ": " + message.guild.id + " at " + d.toUTCString() + "\n>>";
          object.channel.send(txt + msg)
        };
        if(object === this.Client){
          object.channels.get(adminChannel[i]).send(txt + msg)
        };  
      };
      console.log(txt, msg)
    }catch(err){
      console.log(err)
      console.log(txt, msg);
    };
  };
    // check permisions of the author
  this.checkPermisions = function(message, permisions, admin = false){
    if(message instanceof Message && Array.isArray(permisions)){
      for(i in permisions){
        if(message.member.hasPermission(permisions)){
          if(admin){
            txt = "#CheckAdmin: "
          }else{
            txt = "#CheckPermision: "
          }
          this.logAct(txt + permision, message, this.channelList.adminChannel)
          return true
        };
      };
    };
    return false
  };
    // check if author is admin
  this.checkAdmin = function(message){
    return this.checkPermisions(message, ["ADMINISTRATOR"], true)
  }
    // check role of the author
  this.checkRole = function(message, roles){
    if(message instanceof Message && Array.isArray(roles)){
      for(i in roles){
        if(message.member.roles.has(i)){
          this.logAct("#CheckRoles: ", message, this.channelList.adminChannel)
          return true
        };
      };
    };
    return false
  };

  // main of guilda
  this.main = new GuildaMain(this)
};

module.exports = Guilda