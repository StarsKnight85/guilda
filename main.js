const {Client, Attachment, RichEmbed} = require('discord.js');
var guilda = require('./function.js');
const bot = new Client();


const token = process.env.TOKEN;

// VARIABLES
PREFIX = "g!";
var channelList = [643054631152517134, 590176875750621208, 639181256671887389, 643054798496727040];

//https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
var checkPermision = function(message, permision){
    console.log('CHECK permision: ' + permision + " for " + message.author.tag)
    if (message.member.hasPermission(permision)){
        console.log(">>Valid permision")
        return true;
    }else{
        console.log(">>Invalid permision")
        message.channel.send("vous n'avez pas la permission d'exécuter cette commande!");
        return false;
    }
};

var checkRole = function(message, roleName){
    let myRole = message.guild.roles.find(role => role.name === roleName);
    console.log('CHECK role: ' + roleName + " for " + message.author.tag)
    if(message.member.roles.has(myRole.id)){
        console.log(">>Valid role")
        return true;
    }else{
        console.log(">>Invalid role")
        message.channel.send("vous n'avez pas la permission d'exécuter cette commande!");
        return false;
    }
};

logAct = function(bot, channelName, msg){
    console.log(msg);
    bot.channels.get(channelName.id).send(msg);
};

// boot
bot.on('ready', () => {
    idAdminBox = bot.channels.find(channel => channel.name === "admin-command-bot");
    logAct(bot, idAdminBox, `${bot.user.tag} is online!`);
    bot.user.setActivity('a un Test', {type : 'PLAYING'}).catch(console.error);
  });

//commands
bot.on('message', message => {
    if(message.content.indexOf(PREFIX)==0){
        let args = message.content.substring(PREFIX.length).split(" ");
        if(guilda.checkChannelAoth(message, channelList)){
            switch(args[0]){
                case 'clear':
                    if (checkPermision(message, "ADMINISTRATOR")){
                        guilda.clear(message, args[1]);
                    } 
                    break;

                case 'cAB':
                    if (checkPermision(message, "ADMINISTRATOR")){
                        guilda.checkAdminBox(bot, message);
                    }
                    break;
                
                case 'setting' :
                    if(checkPermision(message, "ADMINISTRATOR")){
                        guilda.setting(args);
                    }
                    break;

                /*case 'JHO':
                    message.channel.bulkDelete(1);
                    const attachment2 = new Attachment('./dance_djo.gif')
                    message.channel.send(attachment2);
                    break;*/

                /*case 'rules':
                    message.channel.bulkDelete(1);
                    const rules = new Attachment('./rules.txt')
                    message.channel.send(message.author, rules);
                    break;*/
                
                case 'help':
                    guilda.help(message);
                    break; 
                
                case 'info':
                    guilda.info(message);
                    break;

                case 'Ap':
                    if(checkPermision(message, "ADMINISTRATOR")){
                        message.channel.send("Admin commande :");
                        guilda.ping(message);
                    };
                    break;

                case 'p':
                    guilda.ping(message);
                    break;
                
                default:
                    message.channel.send("Je n'ai pas compris votre commande")
                    break;
            }
        }
    }
});

bot.login(token);