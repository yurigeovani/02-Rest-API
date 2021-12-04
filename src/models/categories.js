const{pool} = require('../../database/connection');
// import { v4 as uuidv4 } from 'uuid';



// ?? ONDE UTILIZAR ESTA CLASSE?
class Category {
    constructor({name}){
        // this.id = uuidv4();
        this.name = name;
    }
}

const get = async()=>{
    const response = await pool.query('SELECT id, name FROM CATEGORIES');
    return response.rows;
}

const getById = async(id)=>{
    const response = await pool.query('SELECT id, name FROM CATEGORIES WHERE ID = $1',[id]);
    return response.rows;
}

const post = async(name)=>{
    await pool.query('INSERT INTO CATEGORIES (name) VALUES ($1)',[name]);
}

const put = async(id, name)=>{
    await pool.query(
           `UPDATE categories 
	        SET (name, updated_at)
            = ($1,CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE)
            WHERE ID = $2`,[name,id]);
}

const del = async(id)=>{
    await pool.query('DELETE FROM CATEGORIES WHERE ID = $1', [id]);
}

module.exports = {
    Category,
    get,
    getById,
    post,
    put,
    del
}