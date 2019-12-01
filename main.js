const {Client, Attachment, RichEmbed} = require('discord.js');
// const guilda = require('./function.js');
const Guilda = require('./guilda.js');
const Setup = require('./setup.js')
const bot = new Client();
const guilda = new Guilda(bot);

const token = Setup.token;

// VARIABLES
Setup.setGuilds(guilda)

// boot
bot.on('ready', () => {
    guilda.logAct(`${bot.user.tag} is online!`, bot, guilda.channelList.adminGuild());
    bot.user.setActivity(Setup.activity, {type : 'PLAYING'}).catch(console.error);
  });

//commands
bot.on('message', message => {
    guilda.message = message
    guilda.main.start()
});

bot.login(token);