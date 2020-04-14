module.exports = {
    name : 'nom_de_la_commande_pour_Discord',
    description : 'Description de la commande pour le <help>',
    //on peut juste préciser 'all' (tout le monde) ou 'admin' (seul les admins)
    permission : [
        'nom_du_rôle_qui_peut_l\'utiliser',
        'un_autre_rôle'
    ],
    limitedLoactionForExe : false, //précise si une commande doit être restreinte au channels autorisés
    /**
     * la fonction qui correspond à la commande
     * @param {Array} guilda un tableau sur la class Bot
     * @param message message utilisateur obtenu par discord
     * @param {Array} args contenu du message divisé en arguments 
     */
    execute(guilda, message, args){
        //la commande à executer
    }
}