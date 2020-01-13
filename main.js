const Discord = require('discord.js');
const bot = new Discord.Client();
const Setup = require('./setup.js')
const token = Setup.token;
const PREFIX = Setup.PREFIX;

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log(`${bot.user.tag} is online!`);
    bot.user.setActivity(Setup.activity, {type : 'PLAYING'}).catch(console.error);
});
 
bot.on('message', message => {
    if(message.content.startsWith(PREFIX)){
        let args = message.content.substring(PREFIX.length).split(" ");
    
        switch (args[0]) {
            case "ping":
                bot.commands.get('ping').execute(message, args);
            break;
            case "hello":
                bot.commands.get('hello').execute(message, args);
            break;
        }
    }
});
 
bot.login(token);