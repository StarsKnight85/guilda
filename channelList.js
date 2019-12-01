/*channelList = {
  message.guild = {
      message.channel.name = {
          id: int,
          admin: bool
      }.
  }.
};*/

// A constructor for channelList object
ChannelList = function(){
  //variables
  Guild = function(idG) {
    this.id = idG;
  };

  Channel = function(id, admin = false) {
    this.id = id;
    this.admin = admin;
  };

  //adding methods
  this.adminGuild = function(){
    listOfChannelAdmin = [];
    // guild seclection
    for(guildSelctor in this){
      if(this[guildSelctor] instanceof Guild){
        // channel selction
        for(channelSelector in this[guildSelctor]){
          if(this[guildSelctor][channelSelector] instanceof Channel && this[guildSelctor][channelSelector]["admin"]){
            listOfChannelAdmin.push(this[guildSelctor][channelSelector]["id"]);
    };};};};
    return listOfChannelAdmin;
  };

  this.adminChannel = function(guild){ // guild = guilda.message.guild
    listOfChannelAdmin = []
    try{
      for(channelSelector in this[guild]){
        if(this[guild][channelSelector] instanceof Channel && this[guild][channelSelector]["admin"]){
          listOfChannelAdmin.push(this[guild][channelSelector]["id"]);
        };
      };
    }catch(err){
      console.log("err:", err)
    };
    return listOfChannelAdmin
  };
  // guildName = name(str) | channel = [name(str), id(int)] | admin = bool
  this.addChannel = function(guildName, channel, admin = false){
    if(Array.isArray(channel)){
      this[guildName][channel[0]] = new Channel(channel[1], admin)
    };
  };
  // guild = [name(str), id(int)]
  this.addGuild = function(guild){
    if(Array.isArray(guild)){
      this[guild[0]] = new Guild(guild[1]);
    };
  };
  // guild = [name(str), id(int)] | channel = [channel1:[name(str), id(int), admin(bool)], channel2:[name(str), id(int), admin(bool)]]
  this.addChannelCollection = function(guild, channel){
    if(Array.isArray(guild) && Array.isArray(channel)){
      if(!this[guild[0]]){
          this.addGuild(guild);
      };
      for(channelSelector=0; channelSelector < channel.length; channelSelector++){
          this.addChannel(guild[0], [channel[channelSelector][0], channel[channelSelector][1]], channel[channelSelector][2]);
      };
    };
  };
  //deleting methods
  this.deleteGuild = function(guildName){
    try{
      if(this[guildName]){
        delete this[guildName];
      };
    }catch(err){
      return //error message
    };
  };
  this.deleteChannel = function(guildName, channelName){
    try{
      if(this[guildName][channelName]){
        delete this[guildName][channelName];
      };
    }catch(err){
      return //error message
    };
  };
};

module.exports = ChannelList;