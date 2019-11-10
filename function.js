const {Client, Attachment, RichEmbed} = require('discord.js');
var guilda = {};

// send in console and admin channel
/*guilda.logAct = function(channelName, msg){
        console.log(msg);
        bot.channels.get(channelName.id).send(msg);
};*/

// check si le bot a accès au channel (hors permission)
guilda.checkChannelAoth = function(message, channelList){
    console.log("Command by " + message.author.tag + " in channel " + message.channel.name + ": " + message.channel.id)
    for(var i=0; i<channelList.length & Array.isArray(channelList); i++){
        if (message.channel.id == channelList[i]){
            return true;
        }
    }
    return false;
};

// add the channel to the channelList by the id
guilda.addCheckChannel = function(newChannel, channelList){
    if(typeof channelList == Array){
        channelList.push(newChannel);
        return channelList;
    }else{
        console.log("TypeERROR: No array ==> Le channel " + newChannel + " n'a put être ajouter!")
        bot.channels.get(idAdminBox.id).send("TypeERROR: No array ==> Le channel " + newChannel + " n'a put être ajouter!")
        return channelList;
    }
}

// remove a channel to the channelList by the id
guilda.removeCheckChannel = function(channelName, channelList){
    if(typeof channelList == Array){
        return channelList.splice(channelList.indexOf(channelName), 1);
    }else{
        console.log("TypeERROR: No array ==> Le channel " + newChannel + " n'a put être retirer!")
        bot.channels.get(idAdminBox.id).send("TypeERROR: No array ==> Le channel " + newChannel + " n'a put être retirer!")
        return channelList;
    }
}

// a clear command
guilda.clear = function(message, nMsg){
    if (nMsg){
        message.channel.bulkDelete(nMsg);
    }else {
        message.channel.send("Veuillez précisez le nombre message à effacé");
    };
};

// a ping function
guilda.ping = function(message){
    message.channel.send("pong");
};

// a ping command for the Admin room
guilda.checkAdminBox = function(bot, message){
    bot.channels.get("643054631152517134").send("Commande de l'utilisateur: " + message.author.tag);
};

// setting for Guilda
guilda.setting = function(args){
    switch(args[1]){
        case 'prefix':
            if(args[2]!=undefined){
                PREFIX=args[2]
                message.channel.send("Désormais vous m'appelerez par le préfix "+args[2])
            }else{
                message.channel.send("Je veux bien savoir comment vous l'appelerez")
            }
            break;
        default :
            message.channel.send("Je sais pas quels paramètres vous voulez changer")
            break;
    }
};

// info about Guilda
guilda.info = function(message){
    message.channel.bulkDelete(1);
    message.channel.send("version : 1.1");
}

// help embed for guilda command
guilda.help = function(message){
    message.channel.bulkDelete(1);
    const embed_help = new RichEmbed()
    .setTitle('Liste des commandes')
    .addField(PREFIX+'help', 'si vous voyer cette ligne c\'est que vous savez à quoi correspond cette commande')
    .addField(PREFIX+'info', "donne les informations à propos du bot")
    .addField(PREFIX+'rules','les règles')
    .addField(PREFIX+'monster','renvoie le lien kiranico du monster rechercher')
    message.channel.send(embed_help);
}

module.exports = guilda;