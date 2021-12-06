import { v4 as uuidv4 } from 'uuid';

export class Product {
    constructor (name, description, price, category_id) {
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.price = price;
        this.category_id = category_id;
    }
}