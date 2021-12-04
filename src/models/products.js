const{pool} = require('../../database/connection');

const get = async () => {
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

const getById = async (id) => {
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

const post = async(name, description, price, category_id) => {
    await pool.query(`
            INSERT 
                INTO products 
                    (name, description, price, category_id)
                VALUES
                    ($1, $2, $3, $4)`, [name, description, price, category_id]);
}

const put = async (name, description, price, category_id, id) => {
    const response = await pool.query(`
        UPDATE products 
	        SET (name, description, price, updated_at, category_id) 
                = ($1, $2, $3, CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE, $4)
            WHERE ID = $5`, [name, description, price, category_id, id]);
}

const del = async (id) => {
    const response = await pool.query('DELETE FROM PRODUCTS WHERE ID = $1', [id])
}




module.exports = {
    get,
    getById,
    post,
    put,
    del
}