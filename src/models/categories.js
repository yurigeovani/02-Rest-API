export default class Category {
    constructor({name}){
        this.id = uuidv4();
        this.name = name;
    }
}


module.exports = {
    Category
}