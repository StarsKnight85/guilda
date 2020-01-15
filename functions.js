module.exports = {
    log: function(message, args, date, admin){
        console.log(">>Command <"+args+"> by <"+message.author.tag+"> at "+date+" <admin:"+admin+">")
    },
    date: function(){
        const d = new Date();
        return "<" + d.toDateString() + " " + d.toTimeString() + ">"
    },
    checkAdmin: function(message){
        if (message.member.hasPermission("ADMINISTRATOR")){
            return true
        }else{
            return false
        }
    }
};