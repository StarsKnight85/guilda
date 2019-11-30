// the main switch for guilda
const GuildaMeth = require('./guilda_meth.js')

GuildaMain = function(guilda){
    // varaibles
    
    // methods
    this.commands = new GuildaMeth(guilda);
    this.name = function(){
        guilda.logAct(guilda.name)
    }

    this.start = function(){
        if(guilda.message.content.startsWith(guilda.PREFIX)){
            let args = guilda.message.content.substring(guilda.PREFIX.length).split(" ");
            switch(args[0]){
                // admin commands
                case 'checkAdmin':
                    this.commands.checkAdmin()
                    break;
                case 'addChannel' :
                    this.commands.addChannel(guilda, args)
                    break;
                
                case 'addGuild':
                    this.commands.addGuild(guilda)
                    break;
                
                case 'deleteChannel' :
                    this.commands.deleteChannel(guilda)
                    break;
                
                case 'deleteGuild' :
                    this.commands.deleteGuild(guilda);
                
                // user commands
                case 'checkUser':
                    this.commands.checkUser()
                    break;
            }
        }

    }
}

module.exports = GuildaMain;