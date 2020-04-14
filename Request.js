class Request {
    constructor(table, target, conditions = null, values = null){
        this.table = table;
        this.target = target;
        this.conditions = conditions;
        this.values = values;
    }
};

module.exports = Request;