import {pool} from '../../database/connection.js';
import { Category } from './Category.js'

const getCategories = async()=>{
    const response = await pool.query('SELECT id, name FROM CATEGORIES');
    return response.rows;
}

const getCategoryById = async(id)=>{
    const response = await pool.query('SELECT id, name FROM CATEGORIES WHERE ID = $1',[id]);
    return response.rows;
}

const postCategory = async(name)=>{
    const category = new Category(name);
    await pool.query('INSERT INTO CATEGORIES (id, name) VALUES ($1, $2)',[category.id, category.name]);
}

const putCategory = async(id, name)=>{
    await pool.query(
           `UPDATE categories 
	        SET (name, updated_at)
            = ($1,CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE)
            WHERE ID = $2`,[name,id]);
}

const deleteCategory = async(id)=>{
    await pool.query('DELETE FROM CATEGORIES WHERE ID = $1', [id]);
}

export {
    getCategories,
    getCategoryById,
    postCategory,
    putCategory,
    deleteCategory
}