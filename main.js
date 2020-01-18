//lib
const Discord = require('discord.js');
const fs = require('fs');
const guilda = new Discord.Client();
//function
guilda.functions = require('./functions.js')
// guilda.functions = GuildaFunction;

//setting
guilda.setting = guilda.functions.loadData("./setting.json");

//token
if (guilda.setting.token === "web"){
    guilda.setting.token = process.env.TOKEN;
}

//commands
guilda.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    guilda.commands.set(command.name, command);
}

//---- CODE ----//

guilda.on('ready', () => {
    console.log(`${guilda.user.tag} is online at ${guilda.functions.date()}`);
    guilda.user.setActivity(guilda.setting.activity.name, {type : guilda.setting.activity.type}).catch(console.error);
});

guilda.on('message', message => {
    if(message.content.startsWith(guilda.setting.PREFIX)){
        let args = message.content.substring(guilda.setting.PREFIX.length).split(" ");
        try{
            if (args[0] === "addChannel"){
                if (guilda.commands.get(args[0]).permission == "admin"){
                    guilda.functions.log(message,args[0],guilda.functions.date(),true)
                    guilda.commands.get(args[0]).execute(guilda, message, args);            
                }
            }else if (guilda.functions.isInChannel(guilda, message)){
                if (guilda.commands.get(args[0]).permission == "admin"){
                    if (guilda.functions.checkAdmin(message)){
                        if (guilda.functions.isInAdminChannel(guilda, message)){
                            guilda.functions.log(message,args[0],guilda.functions.date(),true)
                            guilda.commands.get(args[0]).execute(guilda, message, args);    
                        }
                    }
                }else if (guilda.commands.get(args[0]).permission == "all"){
                    guilda.functions.log(message,args[0],guilda.functions.date(),false)
                    guilda.commands.get(args[0]).execute(guilda, message, args);
                };    
            }
        }catch(err){
            console.log(err)//debug
        }
    };
});

guilda.login(guilda.setting.token);