import {pool} from '../../database/connection.js'
import { Product } from './Product.js';

const getProducts = async () => {
    const response = await pool.query(
        `SELECT p.id as PROD_ID,
                p.name as PROD_NAME,
                p.description as PROD_DESC,
                p.price as PROD_PRICE,
                c.id as CAT_ID,
                c.name as CAT_NAME
            FROM products p
            INNER JOIN categories c
            ON p.category_id = c.id`);
    
    return response.rows;
}

const getProductById = async (id) => {
    const response = await pool.query(
        `SELECT p.id as PROD_ID,
                p.name as PROD_NAME,
                p.description as PROD_DESC,
                p.price as PROD_PRICE,
                c.id as CAT_ID,
                c.name as CAT_NAME
            FROM products p
            INNER JOIN categories c
            ON p.category_id = c.id
            WHERE p.id = $1`, [id]);
    return response.rows;
}

const postProduct = async(name, description, price, category_id) => {
    const product = new Product();
    Object.assign(product, {
        name,
        description,
        price,
        category_id
    })

    await pool.query(`
            INSERT 
                INTO products 
                    (id, name, description, price, category_id)
                VALUES
                    ($1, $2, $3, $4, $5)`, [product.id, product.name, product.description, product.price, product.category_id]);
}

const putProduct = async (name, description, price, category_id, id) => {
    const response = await pool.query(`
        UPDATE products 
	        SET (name, description, price, updated_at, category_id) 
                = ($1, $2, $3, CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE, $4)
            WHERE ID = $5`, [name, description, price, category_id, id]);
}

const deleteProduct = async (id) => {
    const response = await pool.query('DELETE FROM PRODUCTS WHERE ID = $1', [id])
}


export {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}