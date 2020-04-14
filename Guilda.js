const Discord = require('discord.js');
const MySQL = require('mysql');

const Request = require('./Request.js');

class Bot {
    constructor(){
        this.date = new Date();
        this.discord = new Discord.Client();
        //setting on js
        this.setting = this.read_json('./config.json');
        if (this.setting.token === 'web'){
            this.setting.token = process.env.TOKEN;
        }
        //db
        this.sql_create_connection(this.setting.mysql.guilda_database);
        //commands
        this.discord_init_discord_command();
        this.discord_init_init_command();
        //setting on MySQL
        this.setting.name = this.setting.name;
        this.sql_read_data(new Request('config', 'PREFIX', `NOM = '${this.setting.name}'`), (results) => {
            this.setting.prefix = results[0].PREFIX;
        });
        //channels
        this.discord_init_auth_channels();
    }

    //usefull functions
    /**
     * lit un fichier json
     * @param {String} file le chemin du fichier à lire 
     */
    read_json(file){
        const fs = require('fs');
        let settingData = fs.readFileSync(file);
        return JSON.parse(settingData);
    }

    /**
     * renvoie la date en format jour heure
     */
    send_date(){
        return '<' + this.date.toDateString() + ' ' + this.date.toTimeString() + '>';
    }

    //Discord
    /**
     * remplie le champ channels avec les infos de MySQL
     */
    discord_init_auth_channels(){
        this.channels = new Discord.Collection();
        this.sql_read_data(new Request('channels', '*'), (results) => {
            for (let channel of results){
                this.channels.set(`${channel.ID_Channel}`, {
                    ID_Channel  : channel.ID_Channel,
                    admin       : (channel.ADMIN? true : false),
                    ID_Guild    : channel.ID_Guild
                });
            }
        });
    }

    /**
     * initialise les commands du bot dans un objet commands
     */
    discord_init_discord_command(){
        //init
        const fs = require('fs');
        this.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        //code
        for(const file of commandFiles){
            const command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    /**
     * initialise les commandes d'initialisation du bot dans un objet init_commands
     */
    discord_init_init_command(){
        //init
        const fs = require('fs');
        this.init_commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./commands/init').filter(file => file.endsWith('.js'));
        //code
        for(const file of commandFiles){
            const command = require(`./commands/init/${file}`);
            this.init_commands.set(command.name, command);
        }
    }

    /**
     * renvoie vrai si l'utilisateur peut exécuter la commande faux sinon
     * @param message le message reçu par le bot
     * @param name nom de la commande
     */
    discord_have_perm_to_exe(message, name){
        let command = this.commands.get(name);
        if (command != undefined){
            switch (command.permission) {
                case 'admin':
                    return (message.member.hasPermission('ADMINISTRATOR'));
                case 'all':
                    return true;
                default:
                    let have_perm = false;
                    if(Array.isArray(command.permission)){
                        for (let perm of command.permission){
                            if (message.member.hasPermission(perm)){
                                have_perm = true;
                            }
                        }
                    }
                    return have_perm;
            }
        }
        return false;
    }

    /**
     * renvoie vrai si faux si la commande est admin mais pas le channel sinon vrai
     * @param message le message reçu par le bot
     * @param name le nom de la commande
     */
    discord_command_have_perm_to_exe(message, name){
        let command = this.commands.get(name);
        let channel = this.channels.get(message.channel.id);
        if (channel != undefined && channel.admin){
            return true;
        }
        if (channel != undefined && !channel.admin){
            if (command.permission == 'admin'){
                return false;
            }else{
                return true;
            }
        }
        if (channel == undefined){
            return !command.limitedLocationForExe;
        }
    }

    /**
     * Vérifie si la commande peut être exécuter
     * @param message message de l'utilisateur
     * @param name nom de la commande
     */
    discord_can_exe(message, name){
        return this.discord_command_have_perm_to_exe(message, name) && this.discord_have_perm_to_exe(message, name);
    }

    /**
     * renvoie vrai si la commande peut s'exécuter dans le channel faux sinon
     * @param message le message reçu par le bot
     * @param {Array} args le contenu du message dévisé en argument 
     */
    discord_is_right_channel(message, args){
        let channel = this.channels.get(message.channel.id);
        if (channel != undefined){
            if (message.guild.id == channel.ID_Guild){
                if (this.discord_command_have_perm_to_exe(message, args)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * execute la commande selon les arguments
     * @param message le message reçu par le bot
     * @param {Array} args le contenu du message divisé en arguments 
     */
    discord_execute_command(message, args){
        //init
        let can_exe = false;
        //code
        if (this.commands.get(args[0]).limitedLoactionForExe){
            if(guilda.discord_is_right_channel(message, args[0])){
                can_exe = true;
            }
        }else{
            can_exe = true;
        }

        if (can_exe){
            console.log('>>Command <' + args[0] + '> by <' + message.author.tag + '> at '+ this.send_date() + ' <admin:' + message.member.hasPermission('ADMINISTRATOR') + '>');
            this.commands.get(args[0]).execute([this], message, args);
        }
    }
    
    //MySQL
    /**
     * initialise la connexion avec MySQL
     * @param {Object} db_config host, user, password et database pour MySQL
     */
    sql_create_connection(db_config){
        this.mysql_db = MySQL.createConnection({
            host : db_config.host,
            user : db_config.user,
            password : db_config.password,
            database : db_config.database
        });
        console.log("MySQL connecter!");
    }
    
    /**
     * lance la connexion avec MySQL
     */
    sql_connect(){
        /*this.mysql_db.connect((err)=>{
            if(err){
                throw err
            };
            console.log('Database connecté!');
        });*/
    }

    /**
     * lance la déconnexion avec MySQL
     */
    sql_diconnect(){
        /*this.mysql_db.end((err) => {
            if(err) throw err;
            console.log('Database déconnecté!');
        });*/
    }

    /**
     * lit les données de la database db selon la requête request
     * @param {Request} request la requête de séléction fourni à MySQL
     * @param callback fonction callback
     */
    sql_read_data(request, callback){
        this.sql_connect();
        let sql_request = `SELECT ${request.target} FROM ${request.table} ${(request.conditions != null)? 'WHERE ' + request.conditions : ''}`;
        this.mysql_db.query(sql_request,(err, rows, fields) => {
            if(err) {
                throw err;
            }
            callback(rows);
        });
        this.sql_diconnect();
    }

    /**
     * met à jour les données dans la database db selon la requête request
     * @param {Request} request la requête de séléction fourni à MySQL
     * @param callback fonction callback
     */
    sql_update_data(request, callback){
        this.sql_connect();
        let sql_request = `UPDATE ${request.table} SET ${request.target} WHERE ${(request.conditions != null)? request.conditions : 0}`;
        this.mysql_db.query(sql_request,(err, rows, fields) => {
            if(err) {
                throw err;
            }
            callback(rows);
        });
        this.sql_diconnect();
    }

    /**
     * créer les données dans la database db selon la requête request
     * @param {Request} request la requête de séléction fourni à MySQL
     * @param callback fonction callback
     */
    sql_create_data(request, callback){
        this.sql_connect();
        let sql_request = `INSERT INTO ${request.table}(${request.target}) VALUES (${request.values})`;
        this.mysql_db.query(sql_request,(err, rows, fields) => {
            if(err) {
                throw err;
            }
            callback(rows);
        });
        this.sql_diconnect();
    }

    /**
     * Rétire les données de la database
     * @param {Request} request la requête de séléction fourni à MySQL
     * @param callback fonction callback
     */
    sql_delete_data(request, callback){
        this.sql_connect();
        let sql_request = `DELETE FROM ${request.table} WHERE ${(request.conditions == null? 0 : request.conditions)}`;
        this.mysql_db.query(sql_request, (err, rows, fields) => {
            if(err){
                throw err;
            }else{
                callback(rows);
            }
        });
        this.sql_diconnect();
    }
};

module.exports = Bot;