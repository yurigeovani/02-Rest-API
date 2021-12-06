import { v4 as uuidv4 } from 'uuid';

export class Category {
    constructor(name){
        this.id = uuidv4();
        this.name = name;
    }
}