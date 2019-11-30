const {Client, Attachment, RichEmbed} = require('discord.js');
// const guilda = require('./function.js');
const ChannelList = require("./channelList.js")
const Guilda = require('./guilda.js');
const bot = new Client();
const guilda = new Guilda(bot);

const token = process.env.TOKEN;

// VARIABLES
guilda.channelList.addChannelCollection(["Bot arena", '590176875750621204'],[["admin-command-bot", '643054631152517134', true], ["général", '590176875750621208']])
guilda.channelList.addChannelCollection(["Bot arena 2", '643190727383187456'], [["admin-command-bot", '643196451563765760', true], ["général", '643190727811268632']])
guilda.channelList.addChannelCollection(["Salon MH", '514146282986799140'], [["👾⛔admin-command-bot", '643054798496727040', true], ["👾commande-bot", '639181256671887389']])

// boot
bot.on('ready', () => {
  console.log(bot instanceof Client)
    guilda.logAct(`${bot.user.tag} is online!`, bot, guilda.channelList.adminChannel());
    bot.user.setActivity('Monster Hunter World', {type : 'PLAYING'}).catch(console.error);
  });

//commands
bot.on('message', message => {
    guilda.message = message
    guilda.main.start()
});

bot.login(token);