const Bot = require('./Guilda.js');
const Request = require('./Request.js');

const guilda = new Bot();

//lance les fonctions d'init
const json = guilda.read_json('./init.json');
for (init_function of json.functions){
    const init_command = guilda.init_commands.get(init_function);
    if (init_command != undefined){
        init_command.execute([guilda]);
    }
}

guilda.discord.on('ready', () => {
    console.log(`${guilda.discord.user.tag} is online at ${guilda.send_date()}`);
});

guilda.discord.on('message', message => {
    if (message.content.startsWith(guilda.setting.prefix)){
        let args = message.content.substring(guilda.setting.prefix.length).split(" ");
        try{
            if(guilda.discord_have_perm_to_exe(message, args[0])){
                guilda.discord_execute_command(message, args);
            }
        }catch(err){
            console.log("#ERROR at ", guilda.send_date(), " : ", err);
        }
    }
});

guilda.discord.login(guilda.setting.token);