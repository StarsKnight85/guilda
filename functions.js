module.exports = {
    date: function(){
        const d = new Date();
        return "<" + d.toDateString() + " " + d.toTimeString() + ">"
    },
    checkAdmin: function(){
        return true
    }
}