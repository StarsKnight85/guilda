const {Client, Attachment, RichEmbed} = require('discord.js');
const bot = new Client();

const token = process.env.TOKEN;

PREFIX = "g!";

const monster = {
    azur : 'azure-rathalos',
    noir : 'black-diablos',
    girros : 'great-girros', 
    jagras : 'great-jagras',
    taroth : 'kulve-taroth',
    daora : 'kushala-daora',
    rose : "pink-rathian",
    hazak : 'vaal-hazak'
    }

bot.on('ready', () => {
    console.log(`${bot.user.tag} is online!`);
    bot.user.setActivity('Monster Hunter: World', {type : 'PLAYING'}).catch(console.error);
  });

//commandes
bot.on('message', message => {
    if(message.content.indexOf(PREFIX)==0){
        let args = message.content.substring(PREFIX.length).split(" ");

        switch(args[0]){
            case 'monster':
                message.channel.bulkDelete(1);
                if(args[1]) {
                    if(args[2]) {
                        var link = 'https://mhworld.kiranico.com/monster/' + monster[args[2]]
                        var title = args[1] + " " + args[2]
                    } else {
                        var link = 'https://mhworld.kiranico.com/monster/' + args[1]
                        var title = args[1]
                    }
                    const embed = new RichEmbed()
                    .setTitle(title)
                    .addField('link:',link);
                    message.channel.send(embed);
                } else {
                    message.channel.send('la commande "!monster" nécessite le nom du monstre rechercher');
                }
                break;

            case 'JHO':
                message.channel.bulkDelete(1);
                const attachment2 = new Attachment('./dance_djo.gif')
                message.channel.send(attachment2);
                break;

            case 'rules':
                message.channel.bulkDelete(1);
                const rules = new Attachment('./rules.txt')
                message.channel.send(message.author, rules);
                break;
            
            case 'help':
                message.channel.bulkDelete(1);
                const embed_help = new RichEmbed()
                .setTitle('Liste des commandes')
                .addField(PREFIX+'help', 'si vous voyer cette ligne c\'est que vous savez à quoi correspond cette commande')
                .addField(PREFIX+'info', "donne les informations à propos du bot")
                .addField(PREFIX+'rules','les règles')
                .addField(PREFIX+'monster','renvoie le lien kiranico du monster rechercher')
                message.channel.send(embed_help);
                break; 
            
            case 'info':
                message.channel.bulkDelete(1);
                message.channel.send("version : 1.1");
                break;
            case 'p':
                message.channel.send("pong")
                break;
            case 'setting' :
                if (message.author.avatar == "71d48cfbe263d97230b52d9238c9a924" || message.author.avatar=="9bea90b01bf2bcbffa202ef6c04f4535"){
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
                            message.channel.send("Je sais pas quels parramètres vous voulez changer")
                            break;
                }
                }else{
                    message.channel.send("Vous n'avez pas la permission pour utiliser cette commande")
                }
                break;
            default:
                message.channel.send("Je n'ai pas compris votre commande")
                break;
        }
        }
  });

bot.login(token);