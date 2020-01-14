const Discord = require('discord.js');
const guilda = new Discord.Client();
const Setup = require('./setup.js')
guilda.setup = Setup;
const GuildaFunction = require('./functions.js')
guilda.functions = GuildaFunction;

const token = guilda.setup.token;

const fs = require('fs');
guilda.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    guilda.commands.set(command.name, command);
}

guilda.on('ready', () => {
    console.log(`${guilda.user.tag} is online at ${guilda.functions.date()}`);
    guilda.user.setActivity(guilda.setup.activity.name, {type : guilda.setup.activity.type}).catch(console.error);
});

guilda.on('message', message => {
    if(message.content.startsWith(guilda.setup.PREFIX)){
        let args = message.content.substring(guilda.setup.PREFIX.length).split(" ");
        if (guilda.commands.get(args[0]).permision == "admin"){
            if (guilda.functions.checkAdmin()){//CHANGE
                console.log("<Command "+args[0]+" by "+message.author.tag+" at "+guilda.functions.date()+" admin:true>")
                guilda.commands.get(args[0]).execute(message, args);
            };
        }else if (guilda.commands.get(args[0]).permision == "all"){
            console.log("<Command "+args[0]+" by"+message.author.tag+" at "+guilda.functions.date()+" admin:false>")
            guilda.commands.get(args[0]).execute(message, args);
        };
    };
});

guilda.login(token);